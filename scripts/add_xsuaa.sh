#!/bin/bash
cf create-service xsuaa application LetMeIn -c xs-security.json &
process_id=$!
wait $process_id
cf create-service-key LetMeIn KeyIsInvalid &
process_id=$!
wait $process_id
cds bind -2 LetMeIn:KeyIsInvalid
