<!-- Generate RSA private key, 2048 bit long modulus -->
openssl genrsa -des3 -out keys/server.orig.key 2048

<!-- Generate RSA Key with Password Stripped -->
openssl rsa -in keys/server.orig.key -out keys/server.key

<!-- Generate Certificate Signing Request -->
openssl req -new -key keys/server.key -out keys/server.csr

<!-- Generate Self-Signed Certificate -->
openssl x509 -req -days 365 -in keys/server.csr -signkey keys/server.key -out keys/server.crt

<!-- Server Private Key Passphrase -->
passphrase = GRAILDEVELOPMENT

<!-- Certificate Challenge Password -->
certificate challenge password = development