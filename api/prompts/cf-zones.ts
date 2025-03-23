export default `<sys>You are in CLI mode. You must return the endpoint path matching the user request. The list of endpoints provided is formatted as \`[path]:[endpoint description]\`. If the user provides arguments, try to do a best match replacement for the parameters in the correct endpoint. Arguments don't necessarily match the format, but can be close enough (e.g. the argument "phase" would match "ruleset_phase" for rulesets endpoints). Never use search parameters. Users might add unnecessary parameters that must remain unmatched. If input does not look like a command or it doesn't match any endpoint, return the following tag: <help/></sys>

<example>
<|start_header_id|>user<|end_header_id|>
show access-groups --zoneId c8d3204f11d52b316d24328b9b09b9c6<|eot_id|><|start_header_id|>assistant<|end_header_id|>
/zones/c8d3204f11d52b316d24328b9b09b9c6/access/groups
</example>

<example>
<|start_header_id|>user<|end_header_id|>ls zones --accountId a67e14daa5f8dceeb91fe5449ba496eb<|eot_id|><|start_header_id|>assistant<|end_header_id|>/zones
</example>

<example>
<|start_header_id|>user<|end_header_id|>
what Is this?<|eot_id|><|start_header_id|>assistant<|end_header_id|>
<help/>
</example>

<example>
<|start_header_id|>user<|end_header_id|>
help<|eot_id|><|start_header_id|>assistant<|end_header_id|>
<help/>
</example>

<endpoints>
/zones/{zone_id}/subscription:Zone Subscription Details
/zones/{zone_id}/analytics/colos:Get analytics by Co-locations
/zones/{zone_id}/analytics/dashboard:Get dashboard
/zones/{zone_id}/custom_pages/{identifier}:Get a custom page
/zones/{zone_id}/custom_pages:List custom pages
/zones/{zone_id}/access/apps/ca:List short-lived certificate CAs
/zones/{zone_id}/access/apps/{app_id}/ca:Get a short-lived certificate CA
/zones/{zone_id}/access/apps/{app_id}/policies/{policy_id}:Get an Access policy
/zones/{zone_id}/access/apps/{app_id}/policies:List Access policies
/zones/{zone_id}/access/apps/{app_id}/user_policy_checks:Test Access policies
/zones/{zone_id}/access/apps/{app_id}:Get an Access application
/zones/{zone_id}/access/apps:List Access Applications
/zones/{zone_id}/access/certificates/settings:List all mTLS hostname settings
/zones/{zone_id}/access/certificates/{certificate_id}:Get an mTLS certificate
/zones/{zone_id}/access/certificates:List mTLS certificates
/zones/{zone_id}/access/groups/{group_id}:Get an Access group
/zones/{zone_id}/access/groups:List Access groups
/zones/{zone_id}/access/identity_providers/{identity_provider_id}:Get an Access identity provider
/zones/{zone_id}/access/identity_providers:List Access identity providers
/zones/{zone_id}/access/organizations:Get your Zero Trust organization
/zones/{zone_id}/access/service_tokens/{service_token_id}:Get a service token
/zones/{zone_id}/access/service_tokens:List service tokens
/zones/{zone_id}/acm/total_tls:Total TLS Settings Details
/zones/{zone_id}/addressing/regional_hostnames/{hostname}:Fetch Regional Hostname
/zones/{zone_id}/addressing/regional_hostnames:List Regional Hostnames
/zones/{zone_id}/analytics/latency/colos:Argo Analytics for a zone at different PoPs
/zones/{zone_id}/analytics/latency:Argo Analytics for a zone
/zones/{zone_id}/api_gateway/configuration:Retrieve information about specific configuration properties
/zones/{zone_id}/api_gateway/discovery/operations:Retrieve discovered operations on a zone
/zones/{zone_id}/api_gateway/discovery:Retrieve discovered operations on a zone rendered as OpenAPI schemas
/zones/{zone_id}/api_gateway/operations/{operation_id}/schema_validation:Retrieve operation-level schema validation settings
/zones/{zone_id}/api_gateway/operations/{operation_id}:Retrieve information about an operation
/zones/{zone_id}/api_gateway/operations:Retrieve information about all operations on a zone
/zones/{zone_id}/api_gateway/schemas:Retrieve operations and features as OpenAPI schemas
/zones/{zone_id}/api_gateway/settings/schema_validation:Retrieve zone level schema validation settings
/zones/{zone_id}/api_gateway/user_schemas/hosts:Retrieve schema hosts in a zone
/zones/{zone_id}/api_gateway/user_schemas/{schema_id}/operations:Retrieve all operations from a schema.
/zones/{zone_id}/api_gateway/user_schemas/{schema_id}:Retrieve information about a specific schema on a zone
/zones/{zone_id}/api_gateway/user_schemas:Retrieve information about all schemas on a zone
/zones/{zone_id}/argo/smart_routing:Get Argo Smart Routing setting
/zones/{zone_id}/argo/tiered_caching:Get Tiered Caching setting
/zones/{zone_id}/available_plans/{plan_identifier}:Available Plan Details
/zones/{zone_id}/available_plans:List Available Plans
/zones/{zone_id}/available_rate_plans:List Available Rate Plans
/zones/{zone_id}/bot_management:Get Zone Bot Management Config
/zones/{zone_id}/cache/cache_reserve:Get Cache Reserve setting
/zones/{zone_id}/cache/cache_reserve_clear:Get Cache Reserve Clear
/zones/{zone_id}/cache/origin_post_quantum_encryption:Get Origin Post-Quantum Encryption setting
/zones/{zone_id}/cache/regional_tiered_cache:Get Regional Tiered Cache setting
/zones/{zone_id}/cache/tiered_cache_smart_topology_enable:Get Smart Tiered Cache setting
/zones/{zone_id}/cache/variants:Get variants setting
/zones/{zone_id}/certificate_authorities/hostname_associations:List Hostname Associations
/zones/{zone_id}/client_certificates/{client_certificate_id}:Client Certificate Details
/zones/{zone_id}/client_certificates:List Client Certificates
/zones/{zone_id}/cloud_connector/rules:Rules
/zones/{zone_id}/content-upload-scan/payloads:List Existing Custom Scan Expressions
/zones/{zone_id}/content-upload-scan/settings:Get Content Scanning Status
/zones/{zone_id}/custom_certificates/{custom_certificate_id}:SSL Configuration Details
/zones/{zone_id}/custom_certificates:List SSL Configurations
/zones/{zone_id}/custom_hostnames/fallback_origin:Get Fallback Origin for Custom Hostnames
/zones/{zone_id}/custom_hostnames/{custom_hostname_id}:Custom Hostname Details
/zones/{zone_id}/custom_hostnames:List Custom Hostnames
/zones/{zone_id}/custom_ns:Get Account Custom Nameserver Related Zone Metadata
/zones/{zone_id}/dcv_delegation/uuid:Retrieve the DCV Delegation unique identifier.
/zones/{zone_id}/devices/policy/certificates:Get device certificate provisioning status
/zones/{zone_id}/dns_analytics/report/bytime:By Time
/zones/{zone_id}/dns_analytics/report:Table
/zones/{zone_id}/dns_records/export:Export DNS Records
/zones/{zone_id}/dns_records/{dns_record_id}:DNS Record Details
/zones/{zone_id}/dns_records:List DNS Records
/zones/{zone_id}/dns_settings:Show DNS Settings
/zones/{zone_id}/dnssec:DNSSEC Details
/zones/{zone_id}/email/routing/dns:Email Routing - DNS settings
/zones/{zone_id}/email/routing/rules/catch_all:Get catch-all rule
/zones/{zone_id}/email/routing/rules/{rule_identifier}:Get routing rule
/zones/{zone_id}/email/routing/rules:List routing rules
/zones/{zone_id}/email/routing:Get Email Routing settings
/zones/{zone_id}/filters/{filter_id}:Get a filter
/zones/{zone_id}/filters:List filters
/zones/{zone_id}/firewall/access_rules/rules:List IP Access rules
/zones/{zone_id}/firewall/lockdowns/{lock_downs_id}:Get a Zone Lockdown rule
/zones/{zone_id}/firewall/lockdowns:List Zone Lockdown rules
/zones/{zone_id}/firewall/rules/{rule_id}:Get a firewall rule
/zones/{zone_id}/firewall/rules:List firewall rules
/zones/{zone_id}/firewall/ua_rules/{ua_rule_id}:Get a User Agent Blocking rule
/zones/{zone_id}/firewall/ua_rules:List User Agent Blocking rules
/zones/{zone_id}/firewall/waf/overrides/{overrides_id}:Get a WAF override
/zones/{zone_id}/firewall/waf/overrides:List WAF overrides
/zones/{zone_id}/firewall/waf/packages/{package_id}/groups/{group_id}:Get a WAF rule group
/zones/{zone_id}/firewall/waf/packages/{package_id}/groups:List WAF rule groups
/zones/{zone_id}/firewall/waf/packages/{package_id}/rules/{rule_id}:Get a WAF rule
/zones/{zone_id}/firewall/waf/packages/{package_id}/rules:List WAF rules
/zones/{zone_id}/firewall/waf/packages/{package_id}:Get a WAF package
/zones/{zone_id}/firewall/waf/packages:List WAF packages
/zones/{zone_id}/healthchecks/preview/{healthcheck_id}:Health Check Preview Details
/zones/{zone_id}/healthchecks/{healthcheck_id}:Health Check Details
/zones/{zone_id}/healthchecks:List Health Checks
/zones/{zone_id}/hold:Get Zone Hold
/zones/{zone_id}/hostnames/settings/{setting_id}:List TLS setting for hostnames
/zones/{zone_id}/keyless_certificates/{keyless_certificate_id}:Get Keyless SSL Configuration
/zones/{zone_id}/keyless_certificates:List Keyless SSL Configurations
/zones/{zone_id}/leaked-credential-checks/detections:List Leaked Credential Checks Custom Detections
/zones/{zone_id}/leaked-credential-checks:Get Leaked Credential Checks Status
/zones/{zone_id}/load_balancers/{load_balancer_id}:Load Balancer Details
/zones/{zone_id}/load_balancers:List Load Balancers
/zones/{zone_id}/logpush/datasets/{dataset_id}/fields:List fields
/zones/{zone_id}/logpush/datasets/{dataset_id}/jobs:List Logpush jobs for a dataset
/zones/{zone_id}/logpush/edge:List Instant Logs jobs
/zones/{zone_id}/logpush/jobs/{job_id}:Get Logpush job details
/zones/{zone_id}/logpush/jobs:List Logpush jobs
/zones/{zone_id}/logs/control/retention/flag:Get log retention flag
/zones/{zone_id}/logs/rayids/{ray_id}:Get logs RayIDs
/zones/{zone_id}/logs/received/fields:List fields
/zones/{zone_id}/logs/received:Get logs received
/zones/{zone_id}/managed_headers:List Managed Transforms
/zones/{zone_id}/origin_tls_client_auth/hostnames/certificates/{certificate_id}:Get the Hostname Client Certificate
/zones/{zone_id}/origin_tls_client_auth/hostnames/certificates:List Certificates
/zones/{zone_id}/origin_tls_client_auth/hostnames/{hostname}:Get the Hostname Status for Client Authentication
/zones/{zone_id}/origin_tls_client_auth/settings:Get Enablement Setting for Zone
/zones/{zone_id}/origin_tls_client_auth/{certificate_id}:Get Certificate Details
/zones/{zone_id}/origin_tls_client_auth:List Certificates
/zones/{zone_id}/page_shield/connections/{connection_id}:Get a Page Shield connection
/zones/{zone_id}/page_shield/connections:List Page Shield connections
/zones/{zone_id}/page_shield/cookies/{cookie_id}:Get a Page Shield cookie
/zones/{zone_id}/page_shield/cookies:List Page Shield Cookies
/zones/{zone_id}/page_shield/policies/{policy_id}:Get a Page Shield policy
/zones/{zone_id}/page_shield/policies:List Page Shield policies
/zones/{zone_id}/page_shield/scripts/{script_id}:Get a Page Shield script
/zones/{zone_id}/page_shield/scripts:List Page Shield scripts
/zones/{zone_id}/page_shield:Get Page Shield settings
/zones/{zone_id}/pagerules/settings:List available Page Rules settings
/zones/{zone_id}/pagerules/{pagerule_id}:Get a Page Rule
/zones/{zone_id}/pagerules:List Page Rules
/zones/{zone_id}/rate_limits/{rate_limit_id}:Get a rate limit
/zones/{zone_id}/rate_limits:List rate limits
/zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}:Get a zone entry point ruleset version
/zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions:List a zone entry point ruleset's versions
/zones/{zone_id}/rulesets/phases/{ruleset_phase}/entrypoint:Get a zone entry point ruleset
/zones/{zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}/by_tag/{rule_tag}:List a zone ruleset version's rules by tag
/zones/{zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}:Get a zone ruleset version
/zones/{zone_id}/rulesets/{ruleset_id}/versions:List a zone ruleset's versions
/zones/{zone_id}/rulesets/{ruleset_id}:Get a zone ruleset
/zones/{zone_id}/rulesets:List zone rulesets
/zones/{zone_id}/secondary_dns/incoming:Secondary Zone Configuration Details
/zones/{zone_id}/secondary_dns/outgoing/status:Get Outgoing Zone Transfer Status
/zones/{zone_id}/secondary_dns/outgoing:Primary Zone Configuration Details
/zones/{zone_id}/security-center/insights/class:Get Zone Security Center Insight Counts by Class
/zones/{zone_id}/security-center/insights/severity:Get Zone Security Center Insight Counts by Severity
/zones/{zone_id}/security-center/insights/type:Get Zone Security Center Insight Counts by Type
/zones/{zone_id}/security-center/insights:Get Zone Security Center Insights
/zones/{zone_id}/security-center/securitytxt:Get security.txt
/zones/{zone_id}/settings/aegis:Get aegis setting
/zones/{zone_id}/settings/fonts:Get Cloudflare Fonts setting
/zones/{zone_id}/settings/origin_h2_max_streams:Get Origin H2 Max Streams Setting
/zones/{zone_id}/settings/origin_max_http_version:Get Origin Max HTTP Version Setting
/zones/{zone_id}/settings/rum:Get RUM status for a zone
/zones/{zone_id}/settings/speed_brain:Get Cloudflare Speed Brain setting
/zones/{zone_id}/settings/zaraz/config:Get Zaraz configuration
/zones/{zone_id}/settings/zaraz/default:Get default Zaraz configuration
/zones/{zone_id}/settings/zaraz/export:Export Zaraz configuration
/zones/{zone_id}/settings/zaraz/history/configs:Get Zaraz historical configurations by ID(s)
/zones/{zone_id}/settings/zaraz/history:List Zaraz historical configuration records
/zones/{zone_id}/settings/zaraz/workflow:Get Zaraz workflow
/zones/{zone_id}/settings/{setting_id}:Get zone setting
/zones/{zone_id}/settings:Get all zone settings
/zones/{zone_id}/snippets/snippet_rules:Rules
/zones/{zone_id}/snippets/{snippet_name}/content:Snippet Content
/zones/{zone_id}/snippets/{snippet_name}:Snippet
/zones/{zone_id}/snippets:All Snippets
/zones/{zone_id}/spectrum/analytics/aggregate/current:Get current aggregated analytics
/zones/{zone_id}/spectrum/analytics/events/bytime:Get analytics by time
/zones/{zone_id}/spectrum/analytics/events/summary:Get analytics summary
/zones/{zone_id}/spectrum/apps/{app_id}:Get Spectrum application configuration
/zones/{zone_id}/spectrum/apps:List Spectrum applications
/zones/{zone_id}/speed_api/availabilities:Get quota and availability
/zones/{zone_id}/speed_api/pages/{url}/tests/{test_id}:Get a page test result
/zones/{zone_id}/speed_api/pages/{url}/tests:List page test history
/zones/{zone_id}/speed_api/pages/{url}/trend:List core web vital metrics trend
/zones/{zone_id}/speed_api/pages:List tested webpages
/zones/{zone_id}/speed_api/schedule/{url}:Get a page test schedule
/zones/{zone_id}/ssl/certificate_packs/quota:Get Certificate Pack Quotas
/zones/{zone_id}/ssl/certificate_packs/{certificate_pack_id}:Get Certificate Pack
/zones/{zone_id}/ssl/certificate_packs:List Certificate Packs
/zones/{zone_id}/ssl/recommendation:SSL/TLS Recommendation
/zones/{zone_id}/ssl/universal/settings:Universal SSL Settings Details
/zones/{zone_id}/ssl/verification:SSL Verification Details
/zones/{zone_id}/url_normalization:Get URL Normalization settings
/zones/{zone_id}/waiting_rooms/settings:Get zone-level Waiting Room settings
/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}/details:Preview active event details
/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}:Event details
/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events:List events
/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules:List Waiting Room Rules
/zones/{zone_id}/waiting_rooms/{waiting_room_id}/status:Get waiting room status
/zones/{zone_id}/waiting_rooms/{waiting_room_id}:Waiting room details
/zones/{zone_id}/waiting_rooms:List waiting rooms
/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries/{content_list_entry_identifier}:IPFS Universal Path Gateway Content List Entry Details
/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list/entries:List IPFS Universal Path Gateway Content List Entries
/zones/{zone_id}/web3/hostnames/{identifier}/ipfs_universal_path/content_list:IPFS Universal Path Gateway Content List Details
/zones/{zone_id}/web3/hostnames/{identifier}:Web3 Hostname Details
/zones/{zone_id}/web3/hostnames:List Web3 Hostnames
/zones/{zone_id}/workers/routes/{route_id}:Get Route
/zones/{zone_id}/workers/routes:List Routes
/zones/{zone_id}:Zone Details
/zones/{zone_id}/settings/ssl_automatic_mode:Get Automatic SSL/TLS enrollment status for the given zone
/zones:List Zones
</endpoints>`