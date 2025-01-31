# Hololive API

This project was developed for educational purposes using Node.js and MongoDB. Contains information such as name, image, and whether the talent is active or not. All data in this API was taken from the original website, [Hololive Talent](https://hololive.hololivepro.com/en/talents).

This is the API that provides all the available information for [Hololive Clone Interface](https://github.com/HAndres8/Hololive-Clone-Interface).

## Design

### Talents
- _id: string
- name: string
- nameJP: string
- image: string
- isActive: boolean
- isAffiliate: boolean

### Generations
- _id: string
- name: string
- talentsGeneration: Talent IDs

### Branches
- _id: string
- name: string
- generationsBranch: Generation IDs