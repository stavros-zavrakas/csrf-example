# CSRF attack simulation

There are two servers, the social network server that the user is using to communicate with other people and the malicous-blog that can be a random wordpress blog.

There are some routes registered in the social network website:
- route GET /auth : it can be the login page of the social network. In our case, we assume that the user performs the authentication and we set the `accessToken` cookie. This will be sent over on the headers for every request and the user will be recognized as an authenticated user.
- route GET /delete-account : this page can be used from the user to delete the account. There is the delete button that can click and it will fire a POST request that will delete the account (if the cookie is present)
- route POST /delete-account : deletes the account

The concept of the malicious blog is that there is a blog post and below the blogpost there is a form with the contents:
- route / : just displays the blogpost with a form that enables the user to write a comment

## How it works?
The comment form it will not post the comment to the server of the blog but it will fire a POST request to the /delete-account of the social network when the user will click to the comment button. Because the social network server does not even check the referer this attack will succeed. Every user that is logged in to the social network and will try to comment on the malicious blog will lose his/her account.

**Resouces:**
- [owasp.org](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet)
- [How to does the token prevent csrf attack? (stackoverflow)](http://stackoverflow.com/questions/31323416/how-to-does-the-token-prevent-csrf-attack?rq=1)