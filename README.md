# RU Missed Connections
Project for HackRU Spring 2022 -- Social Good Track Winner

## Description
Introducing RU Missed Connections: Your Mobile-Friendly Solution to Unforgettable Campus Encounters!

RU Missed Connections is a mobile app that takes inspiration from the popular Instagram page _rutgers.missedconnections_ and brings it to a whole new level.

#### Sieze the missed opportunities
Whether it was a chance encounter in the library, a smile shared in the quads, or a conversation that left you wanting more, with RU Missed Connections, you can float your message out into the ether in hopes of finding *that* person.  Add location, time, and a description to your post, and let destiny take its course!
#### Connect and chat
Think you're *the* person from the post? Slide up and start a conversation! Exchange contacts, keep talking, or explore more possibilities. Not the intended recipient? No worries - leave a comment and engage!
#### Find encounters near you!
With our heat map feature, find where missed encounters are happening near you. Unearth hidden gems of unforgettable encounters and make your campus experience even more exciting!

## Features
- Simple, clean, intuitive UI design
- Personalized feed of missed connections (themed by location)
- Easy post creation
- Heat map with posts
- Searching for location autocomplete
- Consistent theme

## Authors
Harshith Samayamantula  
Smail Barkouch  
Benjamin Wang  
Adam Trabelsi

## MySQL Database

### Logins
| uid | username | hash | salt | session |
| --- | --- | --- | --- | --- |
| INT | VARCHAR(32) | VARCHAR(60) | VARCHAR(29) | CHAR(88) |
| 123 | john.doe | 1341h2u4n== | sdfsajfn | qwhjrejwq |

### Users
| uid | username | name | gender | grad_year |
| --- | --- | --- | --- | --- |
| INT | VARCHAR(32) | VARCHAR(32) | VARCHAR(16) | CHAR(4) |
| 123 | johndoe | John Doe | male | 2024 |

For gender, 0 will represent male, 1 will represent female, and 2 will represent other.

### Feed
| pid | uid | content | posted_at | location | longitude | latitude |
| --- | --- | --- | --- | --- | --- | --- |
| INT | INT | TEXT | TIMESTAMP | TEXT | FLOAT | FLOAT |
| d4e5f6 | 123 | sample | 1970-01-01 00:00:01 | New Brunswick, New Jersey | 0.00 | 0.00

### Comments
| pid | cid | uid | content  | posted_at |
| --- | --- | --- | ---- | --------- |
| INT | CHAR(6) | INT | TEXT | TIMESTAMP |
| 456 | a1b2c3 | 123 | sample | 1970-01-01 00:00:01 |

### Chat
| sender | recipient | content | sent_at |
| --- | --- | --- | --- |
| INT | INT | VARCHAR(250) | TIMESTAMP |
| 123 | 456 | sample | 1970-01-01 00:00:01 |