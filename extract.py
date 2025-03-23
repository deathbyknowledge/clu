import yaml
import json
import sys
import os
import re
from datetime import datetime

# this file is currently a big mess don't judge

def resolve_object(obj, spec, cache=None, resolving=None):
    # Initialize cache and resolving set if not provided
    is_root = cache is None
    if cache is None:
        cache = {}
    if resolving is None:
        resolving = set()

    # Handle non-dictionary objects (e.g., strings, numbers, lists)
    if not isinstance(obj, dict):
        if isinstance(obj, list):
            return [resolve_object(item, spec, cache, resolving) for item in obj]
        return obj

    # Handle $ref references
    if '$ref' in obj:
        ref = obj['$ref']
        # Check for circular reference
        if ref in resolving:
            return {"$circular_ref": ref}
        # Return cached result if available
        if ref in cache:
            return cache[ref]
        # Resolve the reference
        resolving.add(ref)
        ref_obj = get_ref(spec, ref)  # Assume get_ref fetches the referenced object
        resolved_ref = resolve_object(ref_obj, spec, cache, resolving)
        cache[ref] = resolved_ref
        resolving.remove(ref)
        # Merge with any local properties
        new_obj = resolved_ref.copy()
        for key, value in obj.items():
            if key != '$ref':
                new_obj[key] = resolve_object(value, spec, cache, resolving)
        return new_obj
    # Handle regular objects by resolving all properties
    else:
        new_obj = {}
        for key, value in obj.items():
                new_obj[key] = resolve_object(value, spec, cache, resolving)

        return new_obj

# Placeholder for get_ref (you'll have your own implementation)
def get_ref(spec, ref):
    # Example: Navigate spec to find the referenced object
    # e.g., '#/components/schemas/A' -> spec['components']['schemas']['A']
    parts = ref.lstrip('#/').split('/')
    result = spec
    for part in parts:
        result = result[part]
    return result

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

def sanitize_name(name):
    """Sanitize a name to make it safe for folder or file names."""
    return re.sub(r'[^a-zA-Z0-9_-]', '_', name).lower()

def generate_file_name(operation_id):
    # Split path, remove empty parts, sanitize each part
    path_parts = [re.sub(r'[^a-zA-Z0-9]', '_', part) for part in operation_id.split('/') if part]
    path_part = '_'.join(path_parts)
    return f"{path_part}.txt"

def operation_to_file(operation, uri):
    content = f"Endpoint: {uri}\n"
    description = operation.get('description')
    if description is not None: content += description + '\n'
    summary = operation.get('summary')
    if summary is not None: content += summary + '\n'
    parameters = operation.get('parameters', {})
    content += 'Parameters: '
    for param in parameters:
        content += param['name'] + ' '
    return content


def main(filename):
    # Load the OpenAPI specification
    with open(filename, 'r') as f:
        spec = yaml.safe_load(f)

    # Collect all unique tags from operations
    tags = set()
    for path in spec['paths']:
        for method in spec['paths'][path]:
            operation = spec['paths'][path][method]
            if 'tags' in operation:
                tags.update(operation['tags'])
    tags = sorted(tags)  # Sort for consistent ordering

    content = []
    # Process each tag
    for tag in tags:
        # Sanitize tag name for folder
        folder_name = sanitize_name(tag)
        # Create the folder if it doesn’t exist
        os.makedirs(folder_name, exist_ok=True)

        # Collect operations for this tag
        count = 0
        for path in spec['paths']:
            for method in spec['paths'][path]:
                if method == 'get':
                    operation = spec['paths'][path][method]
                    if 'tags' in operation and tag in operation['tags']:
                        resolved_operation = resolve_object(operation, spec)
                        if 'operationId' in resolved_operation:
                            # file_name = generate_file_name(resolved_operation['operationId'])
                            # file_path = os.path.join(folder_name, file_name)
                            content.append(f'{path}:{resolved_operation.get('summary', '')}')
                        else:
                            print(f"Didn't have operationId (path: {path})")

    with open('endpoints.txt', 'w', encoding='utf-8') as f:
        f.write('\n'.join(sorted(content)))

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: python script.py <openapi.yaml>")
        sys.exit(1)
    main(sys.argv[1])