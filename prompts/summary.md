As an expert in summarization, outlining, and structuring, as well as a web penetration tester, I am tasked with creating a concise and informative summary of the book "LPIC-1 version 5" tailored for beginners in web penetration testing with intermediate English language proficiency.

Requirements:

- Provide a brief main overview section at the beginning
- Use bullet points, titled sections, and bolded key terms for easy and quick review
- Format the summary in HTML, using:
  - <h3> tag for the Main Overview title
  - <b> tag for bolded key terms
  - <table> tag for any data tables mentioned in the content

Please provide the summary in HTML format, without any additional comments or explanations.

Example Content:
Architectural Components of the Web
In this overview chapter, we’ve focused on how two web applications (web browsers
and web servers) send messages back and forth to implement basic transactions.
There are many other web applications that you interact with on the Internet. In this
section, we’ll outline several other important applications, including:
Proxies
HTTP intermediaries that sit between clients and servers
Caches
HTTP storehouses that keep copies of popular web pages close to clients
Gateways
Special web servers that connect to other applications
Tunnels
Special proxies that blindly forward HTTP communications
Agents
Semi-intelligent web clients that make automated HTTP requests

Proxies
Let’s start by looking at HTTP proxy servers, important building blocks for web
security, application integration, and performance optimization.
As shown in Figure 1-11, a proxy sits between a client and a server, receiving all of
the client’s HTTP requests and relaying the requests to the server (perhaps after
modifying the requests). These applications act as a proxy for the user, accessing the
server on the user’s behalf.
Proxies are often used for security, acting as trusted intermediaries through which all
web traffic flows. Proxies can also filter requests and responses; for example, to
detect application viruses in corporate downloads or to filter adult content away
from elementary-school students.

Caches
A web cache or caching proxy is a special type of HTTP proxy server that keeps copies of popular documents that pass through the proxy. The next client requesting the
same document can be served from the cache’s personal copy (see Figure 1-12).

A client may be able to download a document much more quickly from a nearby
cache than from a distant web server. HTTP defines many facilities to make caching
more effective and to regulate the freshness and privacy of cached content. We cover
caching technology in Chapter 7.
Gateways
Gateways are special servers that act as intermediaries for other servers. They are
often used to convert HTTP traffic to another protocol. A gateway always receives
requests as if it was the origin server for the resource. The client may not be aware it
is communicating with a gateway.
For example, an HTTP/FTP gateway receives requests for FTP URIs via HTTP
requests but fetches the documents using the FTP protocol (see Figure 1-13). The
resulting document is packed into an HTTP message and sent to the client.

Tunnels
Tunnels are HTTP applications that, after setup, blindly relay raw data between two
connections. HTTP tunnels are often used to transport non-HTTP data over one or
more HTTP connections, without looking at the data.
One popular use of HTTP tunnels is to carry encrypted Secure Sockets Layer (SSL)
traffic through an HTTP connection, allowing SSL traffic through corporate firewalls that permit only web traffic. As sketched in Figure 1-14, an HTTP/SSL tunnel
receives an HTTP request to establish an outgoing connection to a destination
address and port, then proceeds to tunnel the encrypted SSL traffic over the HTTP
channel so that it can be blindly relayed to the destination server.
Agents
User agents (or just agents) are client programs that make HTTP requests on the
user’s behalf. Any application that issues web requests is an HTTP agent. So far,
we’ve talked about only one kind of HTTP agent: web browsers. But there are many
other kinds of user agents.

For example, there are machine-automated user agents that autonomously wander
the Web, issuing HTTP transactions and fetching content, without human supervision. These automated agents often have colorful names, such as “spiders” or “web
robots” (see Figure 1-15). Spiders wander the Web to build useful archives of web
content, such as a search engine’s database or a product catalog for a comparisonshopping robot.

Expected Answer:

<section>
<h2>Architectural Components of the Web</h2>

    <div>
    <h4>Main Overview</h4>
    <p>The web consists of various applications that facilitate communication between clients and servers.</p>
    </div>

    <h3>Proxies</h3>
    <p>Proxies sit between clients and servers, receiving and relaying HTTP requests. They are used for:</p>

    <ul>
    <li><b>Security</b>: acting as trusted intermediaries for web traffic</li>
    <li><b>Filtering</b>: detecting application viruses or filtering adult content</li>
    <li><b>Performance optimization</b>: modifying requests to improve performance</li>
    </ul>

    <h3>Caches</h3>
    <p>Caches store copies of popular documents, allowing clients to download them more quickly. HTTP defines facilities to regulate caching, including:</p>

    <ul>
    <li><b>Freshness</b>: ensuring cached content is up-to-date</li>
    <li><b>Privacy</b>: protecting sensitive information in cached content</li>
    </ul>

    <h3>Gateways</h3>
    <p>Gateways convert HTTP traffic to other protocols, acting as origin servers for clients. Examples include:</p>

    <ul>
    <li><b>HTTP/FTP gateways</b>: receiving HTTP requests for FTP URIs and fetching documents using FTP</li>
    </ul>

    <h3>Tunnels</h3>
    <p>Tunnels relay raw data between connections, often used for transporting non-HTTP data over HTTP connections. Examples include:</p>

    <ul>
    <li><b>HTTP/SSL tunnels</b>: carrying encrypted SSL traffic through corporate firewalls</li>
    </ul>

    <h3>Agents</h3>
    <p>Agents make HTTP requests on behalf of users, including:</p>

    <ul>
    <li><b>Web browsers</b>: the most common type of HTTP agent</li>
    <li><b>Automated agents</b>: machine-automated programs that issue HTTP transactions and fetch content, such as spiders and web robots</li>
    </ul>

    </section>
