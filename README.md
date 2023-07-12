# art-cart
Art Cart application is shopping cart site for Painiting which is using React &amp; NodeJS


## For Server
`docker build -t server .`

`docker run --rm -p 3001:3001 -v $(pwd):/server --name artcart server`


## For Server
`docker build -t app .`

`docker run --rm -p 3000:3000 -v $(pwd):/app --name artcart app`