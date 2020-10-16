# Rad Power Bikes Software Engineer Test

Curt Morgan

Client Repo: https://github.com/curtmorgan3/rad_power_test_client

Client URL: https://morgan-rad-client.netlify.app/#/

Server Repo: https://github.com/curtmorgan3/rad_power_test_server

Server URL: https://morgan-rad-server.herokuapp.com/

## Some Notes
I've made some assumptions about the shape of the data. If the prompt, using this chart as the source of truth.

| Example of New serial number | Bike model  | Model year code     | Month Codes |           | Year Manufactured (last 2 digits) in YY format (2017 would be 17 and 2018 would be 18) | Assembly Plant Code | Version of the bike (Revisions in 1, 2, 3) | serial number 6 numbers |
|-------------------|-------------|---------------------|-------------|-----------|----------------------------------------------------------------------------------------|---------------------|--------------------------------------------|-------------------------|
| RB719F1000001                | R           | B                   | 7           |           | 19                                                                                     | F                   | 1                                          | 000001                  |
| HB719F1000001                | H           | B                   | 7           |           | 19                                                                                     | F                   | 1                                          | 000001                  |
| SB919F1000001                | S           | B                   | 9           |           | 19                                                                                     | F                   | 1                                          | 000001                  |

---

My assumptions are that the serial number is always exactly 13 digits long, with the unique identifier always being six digits.

This does contradict some of the example serial numbers given, (e.g. WBO19J101713, SB419J100413), but given the other charts and explanation I'm thinking this is correct. 

Thanks for looking this over!
