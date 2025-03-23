export default `<sys>You are in CLI mode. You must return the endpoint path matching the user request. The list of endpoints provided is formatted as \`[path]:[endpoint description]\`. If the user provides arguments, try to do a best match replacement for the parameters in the correct endpoint. Arguments don't necessarily match the format, but can be close enough (e.g. the argument "phase" would match "ruleset_phase" for rulesets endpoints). Never use search parameters. Users might add unnecessary parameters that must remain unmatched. If input does not look like a command or it doesn't match any endpoint, return the following tag: <help/></sys>

<example>
<|start_header_id|>user<|end_header_id|>ls access groups --accountId e4dd204f11d588888d24328b9b09b9c6<|eot_id|><|start_header_id|>assistant<|end_header_id|>/accounts/e4dd204f11d588888d24328b9b09b9c6/access/groups
</example>

<example>
<|start_header_id|>user<|end_header_id|>ls vectorize-indexes --accountId a67e14daa5f8dceeb91fe5449ba496eb --zoneId c8d3204f11d52b316d24328b9b09b9c6<|eot_id|><|start_header_id|>assistant<|end_header_id|>/accounts/a67e14daa5f8dceeb91fe5449ba496eb/vectorize/v2/indexes
</example>

<example>
<|start_header_id|>user<|end_header_id|>what Is this?<|eot_id|><|start_header_id|>assistant<|end_header_id|><help/>
</example>

<example>
<|start_header_id|>user<|end_header_id|>help<|eot_id|><|start_header_id|>assistant<|end_header_id|><help/>
</example>

<endpoints>
/accounts/{account_id}/cloudforce-one/events/attackers:Lists attackers
/accounts/{account_id}/cloudforce-one/events/categories/{categoryId}:Reads a category
/accounts/{account_id}/cloudforce-one/events/categories:Lists categories
/accounts/{account_id}/cloudforce-one/events/countries:Retrieves countries information for all countries
/accounts/{account_id}/cloudforce-one/events/cron:Reads the last cron update time
/accounts/{account_id}/cloudforce-one/events/dataset/{datasetId}:Reads a dataset
/accounts/{account_id}/cloudforce-one/events/dataset:Lists all datasets in an account
/accounts/{account_id}/cloudforce-one/events/indicatorTypes:Lists all indicator types
/accounts/{account_id}/cloudforce-one/events/raw/{datasetId}/{eventId}:Reads data for a raw event
/accounts/{account_id}/cloudforce-one/events/targetIndustries:Lists all target industries
/accounts/{account_id}/cloudforce-one/events/{eventId}/insight/{insightId}:Reads an event insight
/accounts/{account_id}/cloudforce-one/events/{eventId}/raw/{rawId}:Reads data for a raw event
/accounts/{account_id}/cloudforce-one/events/{eventId}:Reads an event
/accounts/{account_id}/cloudforce-one/requests/constants:Get Request Priority, Status, and TLP constants
/accounts/{account_id}/cloudforce-one/requests/priority/quota:Get Priority Intelligence Requirement Quota
/accounts/{account_id}/cloudforce-one/requests/priority/{priority_identifer}:Get a Priority Intelligence Requirement
/accounts/{account_id}/cloudforce-one/requests/quota:Get Request Quota
/accounts/{account_id}/cloudforce-one/requests/types:Get Request Types
/accounts/{account_id}/cloudforce-one/requests/{request_identifier}/asset/{asset_identifer}:Get a Request Asset
/accounts/{account_id}/cloudforce-one/requests/{request_identifier}:Get a Request
/accounts/{account_id}/custom_pages/{identifier}:Get a custom page
/accounts/{account_id}/custom_pages:List custom pages
/accounts/{account_id}/rules/lists/bulk_operations/{operation_id}:Get bulk operation status
/accounts/{account_id}/rules/lists/{list_id}/items/{item_id}:Get a list item
/accounts/{account_id}/access/apps/ca:List short-lived certificate CAs
/accounts/{account_id}/access/apps/{app_id}/ca:Get a short-lived certificate CA
/accounts/{account_id}/access/apps/{app_id}/policies/{policy_id}:Get an Access application policy
/accounts/{account_id}/access/apps/{app_id}/policies:List Access application policies
/accounts/{account_id}/access/apps/{app_id}/user_policy_checks:Test Access policies
/accounts/{account_id}/access/apps/{app_id}:Get an Access application
/accounts/{account_id}/access/apps:List Access applications
/accounts/{account_id}/access/bookmarks/{bookmark_id}:Get a Bookmark application
/accounts/{account_id}/access/bookmarks:List Bookmark applications
/accounts/{account_id}/access/certificates/settings:List all mTLS hostname settings
/accounts/{account_id}/access/certificates/{certificate_id}:Get an mTLS certificate
/accounts/{account_id}/access/certificates:List mTLS certificates
/accounts/{account_id}/access/custom_pages/{custom_page_id}:Get a custom page
/accounts/{account_id}/access/custom_pages:List custom pages
/accounts/{account_id}/access/gateway_ca:List SSH Certificate Authorities (CA)
/accounts/{account_id}/access/groups/{group_id}:Get an Access group
/accounts/{account_id}/access/groups:List Access groups
/accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/groups:List SCIM Group resources
/accounts/{account_id}/access/identity_providers/{identity_provider_id}/scim/users:List SCIM User resources
/accounts/{account_id}/access/identity_providers/{identity_provider_id}:Get an Access identity provider
/accounts/{account_id}/access/identity_providers:List Access identity providers
/accounts/{account_id}/access/keys:Get the Access key configuration
/accounts/{account_id}/access/logs/access_requests:Get Access authentication logs
/accounts/{account_id}/access/logs/scim/updates:List Access SCIM update logs
/accounts/{account_id}/access/organizations/doh:Get your Zero Trust organization DoH settings
/accounts/{account_id}/access/organizations:Get your Zero Trust organization
/accounts/{account_id}/access/policies/{policy_id}:Get an Access reusable policy
/accounts/{account_id}/access/policies:List Access reusable policies
/accounts/{account_id}/access/policy-tests/{policy_test_id}/users:Get an Access policy test users page
/accounts/{account_id}/access/policy-tests/{policy_test_id}:Get the current status of a given Access policy test
/accounts/{account_id}/access/service_tokens/{service_token_id}:Get a service token
/accounts/{account_id}/access/service_tokens:List service tokens
/accounts/{account_id}/access/tags/{tag_name}:Get a tag
/accounts/{account_id}/access/tags:List tags
/accounts/{account_id}/access/users/{user_id}/active_sessions/{nonce}:Get single active session
/accounts/{account_id}/access/users/{user_id}/active_sessions:Get active sessions
/accounts/{account_id}/access/users/{user_id}/failed_logins:Get failed logins
/accounts/{account_id}/access/users/{user_id}/last_seen_identity:Get last seen identity
/accounts/{account_id}/access/users:Get users
/accounts/{account_id}/addressing/address_maps/{address_map_id}:Address Map Details
/accounts/{account_id}/addressing/address_maps:List Address Maps
/accounts/{account_id}/addressing/loa_documents/{loa_document_id}/download:Download LOA Document
/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes/{bgp_prefix_id}:Fetch BGP Prefix
/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/prefixes:List BGP Prefixes
/accounts/{account_id}/addressing/prefixes/{prefix_id}/bgp/status:Get Advertisement Status
/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings/{binding_id}:Get Service Binding
/accounts/{account_id}/addressing/prefixes/{prefix_id}/bindings:List Service Bindings
/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations:List Prefix Delegations
/accounts/{account_id}/addressing/prefixes/{prefix_id}:Prefix Details
/accounts/{account_id}/addressing/prefixes:List Prefixes
/accounts/{account_id}/addressing/regional_hostnames/regions:List Regions
/accounts/{account_id}/addressing/services:List Services
/accounts/{account_id}/ai-gateway/evaluation-types:List Evaluators
/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}:Fetch a Dataset
/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets:List Datasets
/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations/{id}:Fetch a Evaluation
/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations:List Evaluations
/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}/request:Get Gateway Log Request
/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}/response:Get Gateway Log Response
/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}:Get Gateway Log Detail
/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs:List Gateway Logs
/accounts/{account_id}/ai-gateway/gateways/{id}:Fetch a Gateway
/accounts/{account_id}/ai-gateway/gateways:List Gateways
/accounts/{account_id}/ai/authors/search:Author Search
/accounts/{account_id}/ai/finetunes/public:List Public Finetunes
/accounts/{account_id}/ai/finetunes:List Finetunes
/accounts/{account_id}/ai/models/schema:Get Model Schema
/accounts/{account_id}/ai/models/search:Model Search
/accounts/{account_id}/ai/tasks/search:Task Search
/accounts/{account_id}/alerting/v3/available_alerts:Get Alert Types
/accounts/{account_id}/alerting/v3/destinations/eligible:Get delivery mechanism eligibility
/accounts/{account_id}/alerting/v3/destinations/pagerduty/connect/{token_id}:Connect PagerDuty
/accounts/{account_id}/alerting/v3/destinations/pagerduty:List PagerDuty services
/accounts/{account_id}/alerting/v3/destinations/webhooks/{webhook_id}:Get a webhook
/accounts/{account_id}/alerting/v3/destinations/webhooks:List webhooks
/accounts/{account_id}/alerting/v3/history:List History
/accounts/{account_id}/alerting/v3/policies/{policy_id}:Get a Notification policy
/accounts/{account_id}/alerting/v3/policies:List Notification policies
/accounts/{account_id}/audit_logs:Get account audit logs
/accounts/{account_id}/billing/profile:Billing Profile Details
/accounts/{account_id}/botnet_feed/asn/{asn_id}/day_report:Get daily report
/accounts/{account_id}/botnet_feed/asn/{asn_id}/full_report:Get full report
/accounts/{account_id}/botnet_feed/configs/asn:Get list of ASNs
/accounts/{account_id}/brand-protection/url-info:Get results for a URL scan
/accounts/{account_id}/calls/apps/{app_id}:Retrieve app details
/accounts/{account_id}/calls/apps:List apps
/accounts/{account_id}/calls/turn_keys/{key_id}:Retrieve TURN key details
/accounts/{account_id}/calls/turn_keys:List TURN Keys
/accounts/{account_id}/cfd_tunnel/{tunnel_id}/configurations:Get configuration
/accounts/{account_id}/cfd_tunnel/{tunnel_id}/connections:List Cloudflare Tunnel connections
/accounts/{account_id}/cfd_tunnel/{tunnel_id}/connectors/{connector_id}:Get Cloudflare Tunnel connector
/accounts/{account_id}/cfd_tunnel/{tunnel_id}/token:Get a Cloudflare Tunnel token
/accounts/{account_id}/cfd_tunnel/{tunnel_id}:Get a Cloudflare Tunnel
/accounts/{account_id}/cfd_tunnel:List Cloudflare Tunnels
/accounts/{account_id}/challenges/widgets/{sitekey}:Turnstile Widget Details
/accounts/{account_id}/challenges/widgets:List Turnstile Widgets
/accounts/{account_id}/cloudforce-one/scans/config:Get the Scan Config for An Account
/accounts/{account_id}/cloudforce-one/scans/results:Get the Latest Scan Result
/accounts/{account_id}/cni/cnis/{cni}:Get information about a CNI object
/accounts/{account_id}/cni/cnis:List existing CNI objects
/accounts/{account_id}/cni/interconnects/{icon}/loa:Generate the Letter of Authorization (LOA) for a given interconnect
/accounts/{account_id}/cni/interconnects/{icon}/status:Get the current status of an interconnect object
/accounts/{account_id}/cni/interconnects/{icon}:Get information about an interconnect object
/accounts/{account_id}/cni/interconnects:List existing interconnects
/accounts/{account_id}/cni/settings:Get the current settings for the active account
/accounts/{account_id}/cni/slots/{slot}:Get information about the specified slot
/accounts/{account_id}/cni/slots:Retrieve a list of all slots matching the specified parameters
/accounts/{account_id}/custom_ns/availability:Get Eligible Zones for Account Custom Nameservers
/accounts/{account_id}/custom_ns:List Account Custom Nameservers
/accounts/{account_id}/d1/database/{database_id}:Get D1 Database
/accounts/{account_id}/d1/database:List D1 Databases
/accounts/{account_id}/devices/dex_tests/{dex_test_id}:Get Device DEX test
/accounts/{account_id}/devices/dex_tests:List Device DEX tests
/accounts/{account_id}/devices/networks/{network_id}:Get device managed network details
/accounts/{account_id}/devices/networks:List your device managed networks
/accounts/{account_id}/devices/policies:List device settings profiles
/accounts/{account_id}/devices/policy/exclude:Get the Split Tunnel exclude list
/accounts/{account_id}/devices/policy/fallback_domains:Get your Local Domain Fallback list
/accounts/{account_id}/devices/policy/include:Get the Split Tunnel include list
/accounts/{account_id}/devices/policy/{policy_id}/exclude:Get the Split Tunnel exclude list for a device settings profile
/accounts/{account_id}/devices/policy/{policy_id}/fallback_domains:Get the Local Domain Fallback list for a device settings profile
/accounts/{account_id}/devices/policy/{policy_id}/include:Get the Split Tunnel include list for a device settings profile
/accounts/{account_id}/devices/policy/{policy_id}:Get device settings profile by ID
/accounts/{account_id}/devices/policy:Get the default device settings profile
/accounts/{account_id}/devices/posture/integration/{integration_id}:Get device posture integration details
/accounts/{account_id}/devices/posture/integration:List your device posture integrations
/accounts/{account_id}/devices/posture/{rule_id}:Get device posture rule details
/accounts/{account_id}/devices/posture:List device posture rules
/accounts/{account_id}/devices/settings:Get device settings for a Zero Trust account
/accounts/{account_id}/devices/{device_id}/override_codes:Get an admin override code for a device
/accounts/{account_id}/devices/{device_id}:Get device details
/accounts/{account_id}/devices:List devices
/accounts/{account_id}/dex/colos:List Cloudflare colos
/accounts/{account_id}/dex/commands/devices:List devices eligible for remote captures
/accounts/{account_id}/dex/commands/quota:Returns account commands usage, quota, and reset time
/accounts/{account_id}/dex/commands/{command_id}/downloads/{filename}:Download command output file
/accounts/{account_id}/dex/commands:List account commands
/accounts/{account_id}/dex/devices/{device_id}/fleet-status/live:Get the live status of a latest device
/accounts/{account_id}/dex/fleet-status/devices:List fleet status devices
/accounts/{account_id}/dex/fleet-status/live:List fleet status details by dimension
/accounts/{account_id}/dex/fleet-status/over-time:List fleet status aggregate details by dimension
/accounts/{account_id}/dex/http-tests/{test_id}/percentiles:Get percentiles for an http test
/accounts/{account_id}/dex/http-tests/{test_id}:Get details and aggregate metrics for an http test
/accounts/{account_id}/dex/tests/overview:List DEX test analytics
/accounts/{account_id}/dex/tests/unique-devices:Get count of devices targeted
/accounts/{account_id}/dex/traceroute-test-results/{test_result_id}/network-path:Get details for a specific traceroute test run
/accounts/{account_id}/dex/traceroute-tests/{test_id}/network-path:Get network path breakdown for a traceroute test
/accounts/{account_id}/dex/traceroute-tests/{test_id}/percentiles:Get percentiles for a traceroute test
/accounts/{account_id}/dex/traceroute-tests/{test_id}:Get details and aggregate metrics for a traceroute test
/accounts/{account_id}/dlp/datasets/{dataset_id}:Fetch a specific dataset
/accounts/{account_id}/dlp/datasets:Fetch all datasets
/accounts/{account_id}/dlp/email/account_mapping:Get mapping
/accounts/{account_id}/dlp/email/rules/{rule_id}:Get an email scanner rule
/accounts/{account_id}/dlp/email/rules:List all email scanner rules
/accounts/{account_id}/dlp/entries/{entry_id}:Get DLP Entry
/accounts/{account_id}/dlp/entries:List all entries
/accounts/{account_id}/dlp/limits:Fetch limits associated with DLP for account
/accounts/{account_id}/dlp/payload_log:Get payload log settings
/accounts/{account_id}/dlp/profiles/custom/{profile_id}:Get custom profile
/accounts/{account_id}/dlp/profiles/predefined/{profile_id}:Get predefined profile
/accounts/{account_id}/dlp/profiles/{profile_id}:Get DLP Profile
/accounts/{account_id}/dlp/profiles:List all profiles
/accounts/{account_id}/dns_firewall/{dns_firewall_id}/dns_analytics/report/bytime:By Time
/accounts/{account_id}/dns_firewall/{dns_firewall_id}/dns_analytics/report:Table
/accounts/{account_id}/dns_firewall/{dns_firewall_id}/reverse_dns:Show DNS Firewall Cluster Reverse DNS
/accounts/{account_id}/dns_firewall/{dns_firewall_id}:DNS Firewall Cluster Details
/accounts/{account_id}/dns_firewall:List DNS Firewall Clusters
/accounts/{account_id}/dns_settings/views/{view_id}:DNS Internal View Details
/accounts/{account_id}/dns_settings/views:List Internal DNS Views
/accounts/{account_id}/dns_settings:Show DNS Settings
/accounts/{account_id}/email-security/investigate/{postfix_id}/detections:Get message detection details
/accounts/{account_id}/email-security/investigate/{postfix_id}/preview:Get email preview
/accounts/{account_id}/email-security/investigate/{postfix_id}/raw:Get raw email content
/accounts/{account_id}/email-security/investigate/{postfix_id}/trace:Get email trace
/accounts/{account_id}/email-security/investigate/{postfix_id}:Get message details
/accounts/{account_id}/email-security/investigate:Search email messages
/accounts/{account_id}/email-security/settings/allow_policies/{policy_id}:Get an email allow policy
/accounts/{account_id}/email-security/settings/allow_policies:List email allow policies
/accounts/{account_id}/email-security/settings/block_senders/{pattern_id}:Get a blocked email sender
/accounts/{account_id}/email-security/settings/block_senders:List blocked email senders
/accounts/{account_id}/email-security/settings/domains/{domain_id}:Get an email domain
/accounts/{account_id}/email-security/settings/domains:List protected email domains
/accounts/{account_id}/email-security/settings/impersonation_registry/{display_name_id}:Get an entry in impersonation registry
/accounts/{account_id}/email-security/settings/impersonation_registry:List entries in impersonation registry
/accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}:Get a trusted email domain
/accounts/{account_id}/email-security/settings/trusted_domains:List trusted email domains
/accounts/{account_id}/email-security/submissions:Get reclassify submissions
/accounts/{account_id}/email/routing/addresses/{destination_address_identifier}:Get a destination address
/accounts/{account_id}/email/routing/addresses:List destination addresses
/accounts/{account_id}/event_notifications/r2/{bucket_name}/configuration:List Event Notification Rules
/accounts/{account_id}/firewall/access_rules/rules/{rule_id}:Get an IP Access rule
/accounts/{account_id}/firewall/access_rules/rules:List IP Access rules
/accounts/{account_id}/gateway/app_types:List application and application type mappings
/accounts/{account_id}/gateway/audit_ssh_settings:Get Zero Trust SSH settings
/accounts/{account_id}/gateway/categories:List categories
/accounts/{account_id}/gateway/certificates/{certificate_id}:Get Zero Trust certificate details
/accounts/{account_id}/gateway/certificates:List Zero Trust certificates
/accounts/{account_id}/gateway/configuration/custom_certificate:Get Zero Trust certificate configuration
/accounts/{account_id}/gateway/configuration:Get Zero Trust account configuration
/accounts/{account_id}/gateway/lists/{list_id}/items:Get Zero Trust list items
/accounts/{account_id}/gateway/lists/{list_id}:Get Zero Trust list details
/accounts/{account_id}/gateway/lists:List Zero Trust lists
/accounts/{account_id}/gateway/locations/{location_id}:Get Zero Trust Gateway location details
/accounts/{account_id}/gateway/locations:List Zero Trust Gateway locations
/accounts/{account_id}/gateway/logging:Get logging settings for the Zero Trust account
/accounts/{account_id}/gateway/proxy_endpoints/{proxy_endpoint_id}:Get a proxy endpoint
/accounts/{account_id}/gateway/proxy_endpoints:List proxy endpoints
/accounts/{account_id}/gateway/rules/{rule_id}:Get Zero Trust Gateway rule details
/accounts/{account_id}/gateway/rules:List Zero Trust Gateway rules
/accounts/{account_id}/gateway:Get Zero Trust account information
/accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}:Get Hyperdrive
/accounts/{account_id}/hyperdrive/configs:List Hyperdrives
/accounts/{account_id}/iam/permission_groups/{permission_group_id}:Permission Group Details
/accounts/{account_id}/iam/permission_groups:List Account Permission Groups
/accounts/{account_id}/iam/resource_groups/{resource_group_id}:Resource Group Details
/accounts/{account_id}/iam/resource_groups:List Resource Groups
/accounts/{account_id}/images/v1/keys:List Signing Keys
/accounts/{account_id}/images/v1/stats:Images usage statistics
/accounts/{account_id}/images/v1/variants/{variant_id}:Variant details
/accounts/{account_id}/images/v1/variants:List variants
/accounts/{account_id}/images/v1/{image_id}/blob:Base image
/accounts/{account_id}/images/v1/{image_id}:Image details
/accounts/{account_id}/images/v1:List images
/accounts/{account_id}/images/v2:List images V2
/accounts/{account_id}/infrastructure/targets/{target_id}:Get target
/accounts/{account_id}/infrastructure/targets:List all targets
/accounts/{account_id}/intel/asn/{asn}/subnets:Get ASN Subnets
/accounts/{account_id}/intel/asn/{asn}:Get ASN Overview
/accounts/{account_id}/intel/attack-surface-report/issue-types:Get Security Center Issues Types
/accounts/{account_id}/intel/attack-surface-report/issues/class:Get Security Center Issue Counts by Class
/accounts/{account_id}/intel/attack-surface-report/issues/severity:Get Security Center Issue Counts by Severity
/accounts/{account_id}/intel/attack-surface-report/issues/type:Get Security Center Issue Counts by Type
/accounts/{account_id}/intel/attack-surface-report/issues:Get Security Center Issues
/accounts/{account_id}/intel/dns:Get Passive DNS by IP
/accounts/{account_id}/intel/domain-history:Get Domain History
/accounts/{account_id}/intel/domain/bulk:Get Multiple Domain Details
/accounts/{account_id}/intel/domain:Get Domain Details
/accounts/{account_id}/intel/indicator-feeds/permissions/view:List indicator feed permissions
/accounts/{account_id}/intel/indicator-feeds/{feed_id}/data:Get indicator feed data
/accounts/{account_id}/intel/indicator-feeds/{feed_id}:Get indicator feed metadata
/accounts/{account_id}/intel/indicator-feeds:Get indicator feeds owned by this account
/accounts/{account_id}/intel/indicator_feeds/{feed_id}/download:Download indicator feed data
/accounts/{account_id}/intel/ip-list:Get IP Lists
/accounts/{account_id}/intel/ip:Get IP Overview
/accounts/{account_id}/intel/sinkholes:List sinkholes owned by this account
/accounts/{account_id}/intel/whois:Get WHOIS Record
/accounts/{account_id}/load_balancers/monitors/{monitor_id}/references:List Monitor References
/accounts/{account_id}/load_balancers/monitors/{monitor_id}:Monitor Details
/accounts/{account_id}/load_balancers/monitors:List Monitors
/accounts/{account_id}/load_balancers/pools/{pool_id}/health:Pool Health Details
/accounts/{account_id}/load_balancers/pools/{pool_id}/references:List Pool References
/accounts/{account_id}/load_balancers/pools/{pool_id}:Pool Details
/accounts/{account_id}/load_balancers/pools:List Pools
/accounts/{account_id}/load_balancers/preview/{preview_id}:Preview Result
/accounts/{account_id}/load_balancers/regions/{region_id}:Get Region
/accounts/{account_id}/load_balancers/regions:List Regions
/accounts/{account_id}/load_balancers/search:Search Resources
/accounts/{account_id}/logpush/datasets/{dataset_id}/fields:List fields
/accounts/{account_id}/logpush/datasets/{dataset_id}/jobs:List Logpush jobs for a dataset
/accounts/{account_id}/logpush/jobs/{job_id}:Get Logpush job details
/accounts/{account_id}/logpush/jobs:List Logpush jobs
/accounts/{account_id}/logs/audit:Get account audit logs (Version 2, Beta release)
/accounts/{account_id}/logs/control/cmb/config:Get CMB config
/accounts/{account_id}/magic/apps:List Apps
/accounts/{account_id}/magic/cf_interconnects/{cf_interconnect_id}:List interconnect Details
/accounts/{account_id}/magic/cf_interconnects:List interconnects
/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events/{event_t}.{event_n}:Get Event
/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events:List Events
/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots/{snapshot_t}:Get Snapshot
/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots:List Snapshots
/accounts/{account_id}/magic/connectors/{connector_id}:Fetch Connector
/accounts/{account_id}/magic/connectors:List Connectors
/accounts/{account_id}/magic/gre_tunnels/{gre_tunnel_id}:List GRE Tunnel Details
/accounts/{account_id}/magic/gre_tunnels:List GRE tunnels
/accounts/{account_id}/magic/ipsec_tunnels/{ipsec_tunnel_id}:List IPsec tunnel details
/accounts/{account_id}/magic/ipsec_tunnels:List IPsec tunnels
/accounts/{account_id}/magic/routes/{route_id}:Route Details
/accounts/{account_id}/magic/routes:List Routes
/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_id}:Site ACL Details
/accounts/{account_id}/magic/sites/{site_id}/acls:List Site ACLs
/accounts/{account_id}/magic/sites/{site_id}/app_configs:List App Configs
/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}:Site LAN Details
/accounts/{account_id}/magic/sites/{site_id}/lans:List Site LANs
/accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}:Site WAN Details
/accounts/{account_id}/magic/sites/{site_id}/wans:List Site WANs
/accounts/{account_id}/magic/sites/{site_id}:Site Details
/accounts/{account_id}/magic/sites:List Sites
/accounts/{account_id}/members/{member_id}:Member Details
/accounts/{account_id}/members:List Members
/accounts/{account_id}/mnm/config/full:List rules and account configuration
/accounts/{account_id}/mnm/config:List account configuration
/accounts/{account_id}/mnm/rules/{rule_id}:Get rule
/accounts/{account_id}/mnm/rules:List rules
/accounts/{account_id}/mtls_certificates/{mtls_certificate_id}/associations:List mTLS certificate associations
/accounts/{account_id}/mtls_certificates/{mtls_certificate_id}:Get mTLS certificate
/accounts/{account_id}/mtls_certificates:List mTLS certificates
/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}/history/logs:Get deployment logs
/accounts/{account_id}/pages/projects/{project_name}/deployments/{deployment_id}:Get deployment info
/accounts/{account_id}/pages/projects/{project_name}/deployments:Get deployments
/accounts/{account_id}/pages/projects/{project_name}/domains/{domain_name}:Get domain
/accounts/{account_id}/pages/projects/{project_name}/domains:Get domains
/accounts/{account_id}/pages/projects/{project_name}:Get project
/accounts/{account_id}/pages/projects:Get projects
/accounts/{account_id}/pcaps/ownership:List PCAPs Bucket Ownership
/accounts/{account_id}/pcaps/{pcap_id}/download:Download Simple PCAP
/accounts/{account_id}/pcaps/{pcap_id}:Get PCAP request
/accounts/{account_id}/pcaps:List packet capture requests
/accounts/{account_id}/queues/{queue_id}/consumers:List Queue Consumers
/accounts/{account_id}/queues/{queue_id}:Get Queue
/accounts/{account_id}/queues:List Queues
/accounts/{account_id}/r2/buckets/{bucket_name}/cors:Get Bucket CORS Policy
/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}:Get Custom Domain Settings
/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom:List Custom Domains of Bucket
/accounts/{account_id}/r2/buckets/{bucket_name}/domains/managed:Get r2.dev Domain of Bucket
/accounts/{account_id}/r2/buckets/{bucket_name}/lifecycle:Get Object Lifecycle Rules
/accounts/{account_id}/r2/buckets/{bucket_name}/lock:Get Bucket Lock Rules
/accounts/{account_id}/r2/buckets/{bucket_name}/sippy:Get Sippy Configuration
/accounts/{account_id}/r2/buckets/{bucket_name}:Get Bucket
/accounts/{account_id}/r2/buckets:List Buckets
/accounts/{account_id}/r2/metrics:Get Account-Level Metrics
/accounts/{account_id}/registrar/domains/{domain_name}:Get domain
/accounts/{account_id}/registrar/domains:List domains
/accounts/{account_id}/roles/{role_id}:Role Details
/accounts/{account_id}/roles:List Roles
/accounts/{account_id}/rules/lists/{list_id}/items:Get list items
/accounts/{account_id}/rules/lists/{list_id}:Get a list
/accounts/{account_id}/rules/lists:Get lists
/accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions/{ruleset_version}:Get an account entry point ruleset version
/accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint/versions:List an account entry point ruleset's versions
/accounts/{account_id}/rulesets/phases/{ruleset_phase}/entrypoint:Get an account entry point ruleset
/accounts/{account_id}/rulesets/{ruleset_id}/versions/{ruleset_version}/by_tag/{rule_tag}:List an account ruleset version's rules by tag
/accounts/{account_id}/rulesets/{ruleset_id}/versions/{ruleset_version}:Get an account ruleset version
/accounts/{account_id}/rulesets/{ruleset_id}/versions:List an account ruleset's versions
/accounts/{account_id}/rulesets/{ruleset_id}:Get an account ruleset
/accounts/{account_id}/rulesets:List account rulesets
/accounts/{account_id}/rum/site_info/list:List Web Analytics sites
/accounts/{account_id}/rum/site_info/{site_id}:Get a Web Analytics site
/accounts/{account_id}/rum/v2/{ruleset_id}/rules:List rules in Web Analytics ruleset
/accounts/{account_id}/secondary_dns/acls/{acl_id}:ACL Details
/accounts/{account_id}/secondary_dns/acls:List ACLs
/accounts/{account_id}/secondary_dns/peers/{peer_id}:Peer Details
/accounts/{account_id}/secondary_dns/peers:List Peers
/accounts/{account_id}/secondary_dns/tsigs/{tsig_id}:TSIG Details
/accounts/{account_id}/secondary_dns/tsigs:List TSIGs
/accounts/{account_id}/security-center/insights/class:Get Security Center Insight Counts by Class
/accounts/{account_id}/security-center/insights/severity:Get Security Center Insight Counts by Severity
/accounts/{account_id}/security-center/insights/type:Get Security Center Insight Counts by Type
/accounts/{account_id}/security-center/insights:Get Security Center Insights
/accounts/{account_id}/shares/{share_id}/recipients/{recipient_id}:Get share recipient by ID
/accounts/{account_id}/shares/{share_id}/recipients:List share recipients by share ID
/accounts/{account_id}/shares/{share_id}/resources/{resource_id}:Get share resource by ID
/accounts/{account_id}/shares/{share_id}/resources:List share resources by share ID
/accounts/{account_id}/shares/{share_id}:Get account share by ID
/accounts/{account_id}/shares:List account shares
/accounts/{account_id}/storage/analytics/stored:Query Stored Data Analytics (Deprecated)
/accounts/{account_id}/storage/analytics:Query Request Analytics (Deprecated)
/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/keys:List a Namespace's Keys
/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/metadata/{key_name}:Read the metadata for a key
/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/values/{key_name}:Read key-value pair
/accounts/{account_id}/storage/kv/namespaces/{namespace_id}:Get a Namespace
/accounts/{account_id}/storage/kv/namespaces:List Namespaces
/accounts/{account_id}/stream/keys:List signing keys
/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs:List all outputs associated with a specified live input
/accounts/{account_id}/stream/live_inputs/{live_input_identifier}:Retrieve a live input
/accounts/{account_id}/stream/live_inputs:List live inputs
/accounts/{account_id}/stream/storage-usage:Storage use
/accounts/{account_id}/stream/watermarks/{identifier}:Watermark profile details
/accounts/{account_id}/stream/watermarks:List watermark profiles
/accounts/{account_id}/stream/webhook:View webhooks
/accounts/{account_id}/stream/{identifier}/audio:List additional audio tracks on a video
/accounts/{account_id}/stream/{identifier}/captions/{language}/vtt:Return WebVTT captions for a provided language
/accounts/{account_id}/stream/{identifier}/captions/{language}:List captions or subtitles for a provided language
/accounts/{account_id}/stream/{identifier}/captions:List captions or subtitles
/accounts/{account_id}/stream/{identifier}/downloads:List downloads
/accounts/{account_id}/stream/{identifier}/embed:Retrieve embed Code HTML
/accounts/{account_id}/stream/{identifier}:Retrieve video details
/accounts/{account_id}/stream:List videos
/accounts/{account_id}/subscriptions:List Subscriptions
/accounts/{account_id}/teamnet/routes/ip/{ip}:Get tunnel route by IP
/accounts/{account_id}/teamnet/routes/{route_id}:Get tunnel route
/accounts/{account_id}/teamnet/routes:List tunnel routes
/accounts/{account_id}/teamnet/virtual_networks/{virtual_network_id}:Get a virtual network
/accounts/{account_id}/teamnet/virtual_networks:List virtual networks
/accounts/{account_id}/tokens/permission_groups:List Permission Groups
/accounts/{account_id}/tokens/verify:Verify Token
/accounts/{account_id}/tokens/{token_id}:Token Details
/accounts/{account_id}/tokens:List Tokens
/accounts/{account_id}/tunnels:List All Tunnels
/accounts/{account_id}/urlscanner/response/{response_id}:Get raw response
/accounts/{account_id}/urlscanner/scan/{scan_id}/har:Get URL scan's HAR
/accounts/{account_id}/urlscanner/scan/{scan_id}/screenshot:Get screenshot
/accounts/{account_id}/urlscanner/scan/{scan_id}:Get URL scan
/accounts/{account_id}/urlscanner/scan:Search URL scans
/accounts/{account_id}/urlscanner/v2/dom/{scan_id}:Get URL scan's DOM
/accounts/{account_id}/urlscanner/v2/har/{scan_id}:Get URL scan's HAR
/accounts/{account_id}/urlscanner/v2/responses/{response_id}:Get raw response
/accounts/{account_id}/urlscanner/v2/result/{scan_id}:Get URL scan
/accounts/{account_id}/urlscanner/v2/screenshots/{scan_id}.png:Get screenshot
/accounts/{account_id}/urlscanner/v2/search:Search URL scans
/accounts/{account_id}/vectorize/indexes/{index_name}:Get Vectorize Index (Deprecated)
/accounts/{account_id}/vectorize/indexes:List Vectorize Indexes (Deprecated)
/accounts/{account_id}/vectorize/v2/indexes/{index_name}/info:Get Vectorize Index Info
/accounts/{account_id}/vectorize/v2/indexes/{index_name}/metadata_index/list:List Metadata Indexes
/accounts/{account_id}/vectorize/v2/indexes/{index_name}:Get Vectorize Index
/accounts/{account_id}/vectorize/v2/indexes:List Vectorize Indexes
/accounts/{account_id}/warp_connector/{tunnel_id}/token:Get a Warp Connector Tunnel token
/accounts/{account_id}/warp_connector/{tunnel_id}:Get a Warp Connector Tunnel
/accounts/{account_id}/warp_connector:List Warp Connector Tunnels
/accounts/{account_id}/workers/account-settings:Fetch Worker Account Settings
/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/bindings:Get Script Bindings
/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/content:Get Script Content
/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets/{secret_name}:Get Script Secret
/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets:List Script Secrets
/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/settings:Get Script Settings
/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/tags:Get Script Tags
/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}:Worker Details
/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}:Get dispatch namespace
/accounts/{account_id}/workers/dispatch/namespaces:List dispatch namespaces
/accounts/{account_id}/workers/domains/{domain_id}:Get a Domain
/accounts/{account_id}/workers/domains:List Domains
/accounts/{account_id}/workers/durable_objects/namespaces/{id}/objects:List Objects
/accounts/{account_id}/workers/durable_objects/namespaces:List Namespaces
/accounts/{account_id}/workers/scripts/{script_name}/content/v2:Get script content
/accounts/{account_id}/workers/scripts/{script_name}/deployments:List Deployments
/accounts/{account_id}/workers/scripts/{script_name}/schedules:Get Cron Triggers
/accounts/{account_id}/workers/scripts/{script_name}/script-settings:Get Script Settings
/accounts/{account_id}/workers/scripts/{script_name}/settings:Get Settings
/accounts/{account_id}/workers/scripts/{script_name}/subdomain:Get Worker subdomain
/accounts/{account_id}/workers/scripts/{script_name}/usage-model:Fetch Usage Model
/accounts/{account_id}/workers/scripts/{script_name}/versions/{version_id}:Get Version Detail
/accounts/{account_id}/workers/scripts/{script_name}/versions:List Versions
/accounts/{account_id}/workers/scripts/{script_name}:Download Worker
/accounts/{account_id}/workers/scripts:List Workers
/accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/content:Get script content
/accounts/{account_id}/workers/services/{service_name}/environments/{environment_name}/settings:Get Script Settings
/accounts/{account_id}/workers/subdomain:Get Subdomain
/accounts/{account_id}/workflows/{workflow_name}/instances/{instance_id}:Get logs and status from instance
/accounts/{account_id}/workflows/{workflow_name}/instances:List of workflow instances
/accounts/{account_id}/workflows/{workflow_name}/versions/{version_id}:Get Workflow version details
/accounts/{account_id}/workflows/{workflow_name}/versions:List deployed Workflow versions
/accounts/{account_id}/workflows/{workflow_name}:Get Workflow details
/accounts/{account_id}/workflows:List all Workflows
/accounts/{account_id}/zerotrust/connectivity_settings:Get Zero Trust Connectivity Settings
/accounts/{account_id}/zerotrust/subnets:List Subnets
/accounts/{account_id}/zt_risk_scoring/behaviors:Get all behaviors and associated configuration
/accounts/{account_id}/zt_risk_scoring/integrations/reference_id/{reference_id}:Get risk score integration by reference id.
/accounts/{account_id}/zt_risk_scoring/integrations/{integration_id}:Get risk score integration by id.
/accounts/{account_id}/zt_risk_scoring/integrations:List all risk score integrations for the account.
/accounts/{account_id}/zt_risk_scoring/summary:Get risk score info for all users in the account
/accounts/{account_id}/zt_risk_scoring/{user_id}:Get risk event/score information for a specific user
/accounts/{account_id}:Account Details
/accounts:List Accounts
</endpoints>`