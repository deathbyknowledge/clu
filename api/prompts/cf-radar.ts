export default `<sys>You are in CLI mode. You must return the endpoint path matching the user request. The list of endpoints provided is formatted as \`[path]:[endpoint description]\`. If the user provides arguments, try to do a best match replacement for the parameters in the correct endpoint. Arguments don't necessarily match the format, but can be close enough (e.g. the argument "phase" would match "ruleset_phase" for rulesets endpoints). Never use search parameters. Users might add unnecessary parameters that must remain unmatched. If input does not look like a command or it doesn't match any endpoint, return the following tag: <help/></sys>

<example>
<|start_header_id|>user<|end_header_id|>show access-groups --zoneId c8d3204f11d52b316d24328b9b09b9c6<|eot_id|><|start_header_id|>assistant<|end_header_id|>/zones/c8d3204f11d52b316d24328b9b09b9c6/access/groups
/example>

<example>
<|start_header_id|>user<|end_header_id|>ls vectorize-indexes --accountId a67e14daa5f8dceeb91fe5449ba496eb --zoneId c8d3204f11d52b316d24328b9b09b9c6<|eot_id|><|start_header_id|>assistant<|end_header_id|>/accounts/a67e14daa5f8dceeb91fe5449ba496eb/vectorize/v2/indexes
</example>

<example>
<|start_header_id|>user<|end_header_id|>what Is this?<|eot_id|><|start_header_id|>assistant<|end_header_id|><help/>
</example>

<example>
<|start_header_id|>user<|end_header_id|>
help<|eot_id|><|start_header_id|>assistant<|end_header_id|>
<help/>
</example>

<endpoints>
/radar/ai/bots/summary/user_agent:Get AI user agents summary
/radar/ai/bots/timeseries_groups/user_agent:Get AI user agents time series
/radar/ai/inference/summary/model:Get Workers AI models summary
/radar/ai/inference/summary/task:Get Workers AI tasks summary
/radar/ai/inference/timeseries_groups/model:Get Workers AI models time series
/radar/ai/inference/timeseries_groups/task:Get Workers AI tasks time series
/radar/annotations/outages/locations:Get the number of outages by location
/radar/annotations/outages:Get latest Internet outages and anomalies
/radar/annotations:Get latest annotations
/radar/as112/summary/dnssec:Get AS112 DNS queries by DNSSEC summary
/radar/as112/summary/edns:Get AS112 DNS queries by EDNS summary
/radar/as112/summary/ip_version:Get AS112 DNS queries by IP version summary
/radar/as112/summary/protocol:Get AS112 DNS queries by DNS protocol summary
/radar/as112/summary/query_type:Get AS112 DNS queries by type summary
/radar/as112/summary/response_codes:Get AS112 DNS queries by response code summary
/radar/as112/timeseries:Get AS112 DNS queries time series
/radar/as112/timeseries_groups/dnssec:Get AS112 DNS queries by DNSSEC support time series
/radar/as112/timeseries_groups/edns:Get AS112 DNS queries by EDNS support summary
/radar/as112/timeseries_groups/ip_version:Get AS112 DNS queries by IP version time series
/radar/as112/timeseries_groups/protocol:Get AS112 DNS queries by DNS protocol time series
/radar/as112/timeseries_groups/query_type:Get AS112 DNS queries by type time series
/radar/as112/timeseries_groups/response_codes:Get AS112 DNS queries by response code time series
/radar/as112/top/locations/dnssec/{dnssec}:Get top locations by AS112 DNS queries with DNSSEC support
/radar/as112/top/locations/edns/{edns}:Get top locations by AS112 DNS queries with EDNS support
/radar/as112/top/locations/ip_version/{ip_version}:Get top locations by AS112 DNS queries for an IP version
/radar/as112/top/locations:Get top locations by AS112 DNS queries
/radar/attacks/layer3/summary/bitrate:Get layer 3 attacks by bitrate summary
/radar/attacks/layer3/summary/duration:Get layer 3 attacks by duration summary
/radar/attacks/layer3/summary/ip_version:Get layer 3 attacks by IP version summary
/radar/attacks/layer3/summary/protocol:Get layer 3 attacks by protocol summary
/radar/attacks/layer3/summary/vector:Get layer 3 attacks by vector summary
/radar/attacks/layer3/timeseries:Get layer 3 attacks by bytes time series
/radar/attacks/layer3/timeseries_groups/bitrate:Get layer 3 attacks by bitrate time series
/radar/attacks/layer3/timeseries_groups/duration:Get layer 3 attacks by duration time series
/radar/attacks/layer3/timeseries_groups/industry:Get layer 3 attacks by target industries time series
/radar/attacks/layer3/timeseries_groups/ip_version:Get layer 3 attacks by IP version time series
/radar/attacks/layer3/timeseries_groups/protocol:Get layer 3 attacks by protocol time series
/radar/attacks/layer3/timeseries_groups/vector:Get layer 3 attacks by vector time series
/radar/attacks/layer3/timeseries_groups/vertical:Get layer 3 attacks by vertical time series
/radar/attacks/layer3/top/attacks:Get top layer 3 attack pairs (origin and target locations)
/radar/attacks/layer3/top/industry:Get top industries targeted by layer 3 attacks
/radar/attacks/layer3/top/locations/origin:Get top origin locations of layer 3 attacks
/radar/attacks/layer3/top/locations/target:Get top target locations of layer 3 attacks
/radar/attacks/layer3/top/vertical:Get top verticals targeted by layer 3 attacks
/radar/attacks/layer7/summary/http_method:Get layer 7 attacks by HTTP method summary
/radar/attacks/layer7/summary/http_version:Get layer 7 attacks by HTTP version summary
/radar/attacks/layer7/summary/ip_version:Get layer 7 attacks by IP version summary
/radar/attacks/layer7/summary/managed_rules:Get layer 7 attacks by managed rules summary
/radar/attacks/layer7/summary/mitigation_product:Get layer 7 attacks by mitigation product summary
/radar/attacks/layer7/timeseries:Get layer 7 attacks time series
/radar/attacks/layer7/timeseries_groups/http_method:Get layer 7 attacks by HTTP method time series
/radar/attacks/layer7/timeseries_groups/http_version:Get layer 7 attacks by HTTP version time series
/radar/attacks/layer7/timeseries_groups/industry:Get layer 7 attacks by target industries time series
/radar/attacks/layer7/timeseries_groups/ip_version:Get layer 7 attacks by IP version time series
/radar/attacks/layer7/timeseries_groups/managed_rules:Get layer 7 attacks by managed rules time series
/radar/attacks/layer7/timeseries_groups/mitigation_product:Get layer 7 attacks by mitigation product time series
/radar/attacks/layer7/timeseries_groups/vertical:Get layer 7 attacks by vertical time series
/radar/attacks/layer7/top/ases/origin:Get top origin ASes of layer 7 attacks
/radar/attacks/layer7/top/attacks:Get top layer 7 attack pairs (origin and target locations)
/radar/attacks/layer7/top/industry:Get top industries targeted by layer 7 attacks
/radar/attacks/layer7/top/locations/origin:Get top origin locations of layer 7 attacks
/radar/attacks/layer7/top/locations/target:Get top target locations of layer 7 attacks
/radar/attacks/layer7/top/vertical:Get top verticals targeted by layer 7 attacks
/radar/bgp/hijacks/events:Get BGP hijack events
/radar/bgp/ips/timeseries:Get announced IP address space time series
/radar/bgp/leaks/events:Get BGP route leak events
/radar/bgp/routes/ases:List ASes from global routing tables
/radar/bgp/routes/moas:Get Multi-Origin AS (MOAS) prefixes
/radar/bgp/routes/pfx2as:Get prefix-to-ASN mapping
/radar/bgp/routes/stats:Get BGP routing table stats 
/radar/bgp/timeseries:Get BGP time series
/radar/bgp/top/ases/prefixes:Get top ASes by prefix count
/radar/bgp/top/ases:Get top ASes by BGP updates
/radar/bgp/top/prefixes:Get top prefixes by BGP updates
/radar/datasets/{alias}:Get dataset CSV stream
/radar/datasets:List datasets
/radar/dns/summary/cache_hit:Get DNS queries by cache status summary
/radar/dns/summary/dnssec:Get DNS queries by DNSSEC support summary
/radar/dns/summary/dnssec_aware:Get DNS queries by DNSSEC awareness summary
/radar/dns/summary/dnssec_e2e:Get DNS queries by DNSSEC end-to-end summary
/radar/dns/summary/ip_version:Get DNS queries by IP version summary
/radar/dns/summary/matching_answer:Get DNS queries by matching answer summary
/radar/dns/summary/protocol:Get DNS queries by protocol summary
/radar/dns/summary/query_type:Get DNS queries by type summary
/radar/dns/summary/response_code:Get DNS queries by response code summary
/radar/dns/summary/response_ttl:Get DNS queries by response TTL summary
/radar/dns/timeseries:Get DNS queries time series
/radar/dns/timeseries_groups/cache_hit:Get DNS queries by cache status time series
/radar/dns/timeseries_groups/dnssec:Get DNS queries by DNSSEC support time series
/radar/dns/timeseries_groups/dnssec_aware:Get DNS queries by DNSSEC awareness time series
/radar/dns/timeseries_groups/dnssec_e2e:Get DNS queries by DNSSEC end-to-end time series
/radar/dns/timeseries_groups/ip_version:Get DNS queries by IP version time series
/radar/dns/timeseries_groups/matching_answer:Get DNS queries by matching answer time series
/radar/dns/timeseries_groups/protocol:Get DNS queries by protocol time series
/radar/dns/timeseries_groups/query_type:Get DNS queries by type time series
/radar/dns/timeseries_groups/response_code:Get DNS queries by response code time series
/radar/dns/timeseries_groups/response_ttl:Get DNS queries by response TTL time series
/radar/dns/top/ases:Get top ASes by DNS queries
/radar/dns/top/locations:Get top locations by DNS queries
/radar/email/routing/summary/arc:Get email ARC validation summary
/radar/email/routing/summary/dkim:Get email DKIM validation summary
/radar/email/routing/summary/dmarc:Get email DMARC validation summary
/radar/email/routing/summary/encrypted:Get email encryption status summary
/radar/email/routing/summary/ip_version:Get email IP version summary
/radar/email/routing/summary/spf:Get email SPF validation summary
/radar/email/routing/timeseries_groups/arc:Get email ARC validation time series
/radar/email/routing/timeseries_groups/dkim:Get email DKIM validation time series
/radar/email/routing/timeseries_groups/dmarc:Get email DMARC validation time series
/radar/email/routing/timeseries_groups/encrypted:Get email encryption status time series
/radar/email/routing/timeseries_groups/ip_version:Get email IP version time series
/radar/email/routing/timeseries_groups/spf:Get email SPF validation time series
/radar/email/security/summary/arc:Get email ARC validation summary
/radar/email/security/summary/dkim:Get email DKIM validation summary
/radar/email/security/summary/dmarc:Get email DMARC validation summary
/radar/email/security/summary/malicious:Get email malicious classification summary
/radar/email/security/summary/spam:Get email spam classification summary
/radar/email/security/summary/spf:Get email SPF validation summary
/radar/email/security/summary/spoof:Get email spoof classification summary
/radar/email/security/summary/threat_category:Get email threat category summary
/radar/email/security/summary/tls_version:Get email TLS version summary
/radar/email/security/timeseries_groups/arc:Get email ARC validation time series
/radar/email/security/timeseries_groups/dkim:Get email DKIM validation time series
/radar/email/security/timeseries_groups/dmarc:Get email DMARC validation time series
/radar/email/security/timeseries_groups/malicious:Get email malicious classification time series
/radar/email/security/timeseries_groups/spam:Get email spam classification time series
/radar/email/security/timeseries_groups/spf:Get email SPF validation time series
/radar/email/security/timeseries_groups/spoof:Get email spoof classification time series
/radar/email/security/timeseries_groups/threat_category:Get email threat category time series
/radar/email/security/timeseries_groups/tls_version:Get email TLS version time series
/radar/email/security/top/tlds/malicious/{malicious}:Get top TLDs by email malicious classification
/radar/email/security/top/tlds/spam/{spam}:Get top TLDs by email spam classification
/radar/email/security/top/tlds/spoof/{spoof}:Get top TLDs by email spoof classification
/radar/email/security/top/tlds:Get top TLDs by email message volume
/radar/entities/asns/ip:Get AS details by IP address
/radar/entities/asns/{asn}/rel:Get AS-level relationships by ASN
/radar/entities/asns/{asn}:Get AS details by ASN
/radar/entities/asns:List autonomous systems
/radar/entities/ip:Get IP address details
/radar/entities/locations/{location}:Get location details
/radar/entities/locations:List locations
/radar/http/summary/bot_class:Get HTTP requests by bot class summary
/radar/http/summary/device_type:Get HTTP requests by device type summary
/radar/http/summary/http_protocol:Get HTTP requests by HTTP/HTTPS summary
/radar/http/summary/http_version:Get HTTP requests by HTTP version summary
/radar/http/summary/ip_version:Get HTTP requests by IP version summary
/radar/http/summary/os:Get HTTP requests by OS summary
/radar/http/summary/post_quantum:Get HTTP requests by post-quantum support summary
/radar/http/summary/tls_version:Get HTTP requests by TLS version summary
/radar/http/timeseries:Get HTTP requests time series
/radar/http/timeseries_groups/bot_class:Get HTTP requests by bot class time series
/radar/http/timeseries_groups/browser:Get HTTP requests by user agent time series
/radar/http/timeseries_groups/browser_family:Get HTTP requests by user agent family time series
/radar/http/timeseries_groups/device_type:Get HTTP requests by device type time series
/radar/http/timeseries_groups/http_protocol:Get HTTP requests by HTTP/HTTPS time series
/radar/http/timeseries_groups/http_version:Get HTTP requests by HTTP version time series
/radar/http/timeseries_groups/ip_version:Get HTTP requests by IP version time series
/radar/http/timeseries_groups/os:Get HTTP requests by OS time series
/radar/http/timeseries_groups/post_quantum:Get HTTP requests by post-quantum support time series
/radar/http/timeseries_groups/tls_version:Get HTTP requests by TLS version time series
/radar/http/top/ases/bot_class/{bot_class}:Get top ASes by HTTP requests for a bot class
/radar/http/top/ases/browser_family/{browser_family}:Get top ASes by HTTP requests for a browser family
/radar/http/top/ases/device_type/{device_type}:Get top ASes by HTTP requests for a device type
/radar/http/top/ases/http_protocol/{http_protocol}:Get top ASes by HTTP requests for an HTTP protocol
/radar/http/top/ases/http_version/{http_version}:Get top ASes by HTTP requests for an HTTP version
/radar/http/top/ases/ip_version/{ip_version}:Get top ASes by HTTP requests for an IP version
/radar/http/top/ases/os/{os}:Get top ASes by HTTP requests for an OS
/radar/http/top/ases/tls_version/{tls_version}:Get top ASes by HTTP requests for a TLS version
/radar/http/top/ases:Get top ASes by HTTP requests
/radar/http/top/browser:Get top user agents by HTTP requests
/radar/http/top/browser_family:Get top user agent families by HTTP requests
/radar/http/top/locations/bot_class/{bot_class}:Get top locations by HTTP requests for a bot class
/radar/http/top/locations/browser_family/{browser_family}:Get top locations by HTTP requests for a browser family
/radar/http/top/locations/device_type/{device_type}:Get top locations by HTTP requests for a device type
/radar/http/top/locations/http_protocol/{http_protocol}:Get top locations by HTTP requests for an HTTP protocol
/radar/http/top/locations/http_version/{http_version}:Get top locations by HTTP requests for an HTTP version
/radar/http/top/locations/ip_version/{ip_version}:Get top locations by HTTP requests for an IP version
/radar/http/top/locations/os/{os}:Get top locations by HTTP requests for an OS
/radar/http/top/locations/tls_version/{tls_version}:Get top locations by HTTP requests for a TLS version
/radar/http/top/locations:Get top locations by HTTP requests
/radar/netflows/summary:Get network traffic summary
/radar/netflows/timeseries:Get network traffic time series
/radar/netflows/top/ases:Get top ASes by network traffic
/radar/netflows/top/locations:Get top locations by network traffic
/radar/quality/iqi/summary:Get Internet Quality Index (IQI) summary
/radar/quality/iqi/timeseries_groups:Get Internet Quality Index (IQI) time series
/radar/quality/speed/histogram:Get speed tests histogram
/radar/quality/speed/summary:Get speed tests summary
/radar/quality/speed/top/ases:Get top ASes by speed test results
/radar/quality/speed/top/locations:Get top locations by speed test results
/radar/ranking/domain/{domain}:Get domain rank details
/radar/ranking/internet_services/categories:List Internet services categories
/radar/ranking/internet_services/timeseries_groups:Get Internet services rank time series
/radar/ranking/internet_services/top:Get top Internet services
/radar/ranking/timeseries_groups:Get domains rank time series
/radar/ranking/top:Get top or trending domains
/radar/robots_txt/top/domain_categories:Get top domain categories by robots.txt files parsed
/radar/robots_txt/top/user_agents/directive:Get top user agents on robots.txt files
/radar/search/global:Search for locations, ASes, and reports
/radar/tcp_resets_timeouts/summary:Get TCP resets and timeouts summary
/radar/tcp_resets_timeouts/timeseries_groups:Get TCP resets and timeouts time series
/radar/traffic_anomalies/locations:Get top locations by total traffic anomalies
/radar/traffic_anomalies:Get latest Internet traffic anomalies
/radar/verified_bots/top/bots:Get top verified bots by HTTP requests
/radar/verified_bots/top/categories:Get top verified bot categories by HTTP requests
</endpoints>`