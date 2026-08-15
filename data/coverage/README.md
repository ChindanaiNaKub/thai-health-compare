# Coverage registry

This directory records researched insurer/product candidates, including
negative results. It is intentionally not a complete OIC universe yet. A record
must distinguish `insufficient_data`, `not_found`, and `not_verified` instead of
collapsing them into “rejected”.

The public plan loader only loads `data/plans/`; this registry is an audit trail
for sourcing and scope decisions.
