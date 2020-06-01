---
path: "/writing/session-vs-token-auth"
date: "2020-05-31"
title: "Session vs. Token Based Authentication"
---

Session based authentication is the classic way of doing authentication in a web application. Each sign-in passes back a key
to the client. This key is associated with a record in a database linked to a user identity. Clients pass this key back to the server
which then looks it up in the database to verify further interactions with the application.

Token based authentication is the new kid on the block. Each sign-in passes back an encrypted blob of data (aka token) to the client that contains
identity information. Clients pass this token back to the server which can decrypt it and verify further interactions with the application.

Although token based authentication has been getting more and more traction lately, I'm still quite fond of
session authentication. Although in theory token based auth is simpler and more scalable than session based auth, when it
comes to supporting the entire auth lifecycle (issuing/verifying/revoking) I believe it ends up being slightly
more complicated with pretty much the exact same scalability properties as session based auth. Let's compare how they stack up in more detail.

## Session Authentication

_Issuing:_

1. Authentication request with credentials is made to the server and verified.
2. A session is inserted into the database.
3. The session key is returned to the client.

_Verifying:_

1. A request is made to access a secure resource and comes along with a session key.
2. A query is issued to the database to verify the validity/owner of the session key.

_Revoking:_

1. A request to revoke is made to the server for either a specific session or all sessions.
2. A query is issued to the database to delete the relevant sessions.

_Scalability:_

All three lifecycle events involve interacting with the database.

## Token Authentication (without revocation)

_Issuing:_

1. Authentication request with credentials is made to the server and verified.
2. A token is created with identity information and passed back to the client.

_Verifying:_

1. A request is made to access a secure resource and comes along with a token.
2. The server decrypts that token to verify the validity/owner of the request.

_Revoking:_

The argument for doing away with support for revoking tokens is that in practice
it's just not that important or commonly used functionality.

_Scalability:_

Issuing requires a lookup of credentials the same as with session authentication,
but no record insertion unlike session authentication. Verification requires no interaction with
the database at all! So long as we don't need to support revoking tokens, this seems like
a pretty cut and dry win for token authentication. But what happens when you need to support
revoking tokens?

## Token Authentication (with revoked token blacklist)

There are a couple ways to support revocation with tokens. One could create a blacklist of tokens that are revoked,
or one could store a whitelist of valid tokens. Let's start with the revoked token blacklist:

_Issuing:_ Same as without revocation support above.

_Verifying:_

1. A request is made to access a secure resource and comes along with a token.
2. The server checks the token blacklist in the database to verify it hasn't been revoked.
3. The server decrypts that token to verify the validity/owner of the request.

_Revoking:_

1. A request to revoke a token is made to the server.
2. A query is issued to the database to insert that token into the blacklist.

_Scalability:_

We've introduced a database lookup in token verification, so we lose most of the scaling
benefits of the token based approach. We retain the benefit that sign-ins still don't require
database inserts though, unlike session based auth.

_Constraints:_

One further constraint of the blacklist approach is the inability to revoke all tokens,
since we don't know all tokens that might be out there.

## Token Authentication (with valid token whitelist)

_Issuing:_:

1. Authentication request with credentials is made to the server and verified.
2. A token is created with identity information, then inserted into the database.
3. The token is returned to the user.

_Verifying:_:

1. A request is made to access a secure resource and comes along with a token.
2. The server checks the token whitelist in the database to verify it hasn't been revoked.
3. The server decrypts that token to verify the validity/owner of the request.

_Revoking:_

1. A request to revoke a specific token or all tokens is made to the server.
2. A query is issued to the database to delete the relvant tokens from the whitelist.

_Scalability:_

Compared to token authentication without support for revoking tokens, we've added
a database insert to the issuing process, and a lookup to the verification process,
nullifying any scalability benefit of tokens.

_Constraints:_

Unlike the blacklist approach, we can revoke all tokens with this approach.
