# HTTP 协议升级

协议升级请求，尤其是从HTTP/1.x到HTTP/2或WebSocket，是一个特定的过程，使客户端和服务器之间的连接能够切换到不同的协议。这里将简要描述协议升级的基本概念和过程。

### HTTP/1.1 升级机制：

HTTP/1.1提供了一个特殊的机制，可以在保持TCP连接的同时更改传输层的协议。这主要是通过`Upgrade`头部来完成的。

1. **客户端发起请求**：
    客户端在其请求头部中包括`Upgrade`头，该头指明希望切换到的协议。例如，为了切换到WebSocket，客户端将发送：
    ```
    GET /my-resource HTTP/1.1
    Host: example.com
    Connection: Upgrade
    Upgrade: websocket
    ```

2. **服务器响应**：
    - 如果服务器支持并愿意升级到所请求的协议，它将发送`101 Switching Protocols`状态码作为响应。
    - 如果服务器不支持或不愿意升级，它可以发送一个非101的响应，如`200 OK`或`400 Bad Request`，并继续使用原始协议。

### HTTP/2 的升级过程：

HTTP/2的升级过程与上面描述的略有不同。虽然HTTP/2可以使用相同的`Upgrade`头部进行协议升级，但在实际中，多数HTTP/2连接是通过ALPN（应用层协议协商）在TLS握手期间静默地建立的。

1. **通过ALPN**：当客户端和服务器开始TLS握手时，客户端将提供它所支持的协议列表，其中包括HTTP/2。服务器从列表中选择一个它也支持的协议，并在TLS握手期间通知客户端。这样，当握手完成时，连接已经是HTTP/2。

2. **使用`Upgrade`头部**：这种方法不太常用，但技术上是可能的。客户端在请求头部中包括一个`Upgrade: h2c`头部，表明它希望升级到非加密的HTTP/2连接。

### 注意事项：

- 对于HTTP/2，大多数现代浏览器和服务器只支持通过ALPN进行的升级，并且只在TLS（HTTPS）上使用HTTP/2。
- WebSocket通常使用HTTP/1.1的`Upgrade`头部进行升级。
- 升级请求可能受到中间设备（如代理或负载均衡器）的影响，这些设备可能不完全支持所请求的协议。

总的来说，协议升级是一种允许在不断开TCP连接的情况下更改协议的机制。这使得新的协议可以与现有的基础设施一起使用，而不需要进行重大更改。

### Nginx 如何配置

为了将Nginx配置为使用HTTP/2，你需要考虑以下几个步骤。但是，请注意，HTTP/2在Nginx中仅支持TLS（即HTTPS）连接。

1. **确保你的Nginx版本支持HTTP/2**:

   首先，你需要确保你的Nginx版本支持HTTP/2。可以使用下面的命令查看：
   ```
   nginx -V
   ```
   输出中应该包含`--with-http_v2_module`。

2. **在配置文件中启用HTTP/2**:

   找到你的Nginx配置文件（通常是`/etc/nginx/nginx.conf`或者在`/etc/nginx/sites-available/`目录中的虚拟主机文件），然后在`listen`指令中添加`http2`关键字。

   ```
   server {
       listen 443 ssl http2;
       listen [::]:443 ssl http2;

       # 其他的ssl相关配置, 如ssl_certificate, ssl_certificate_key等
       ...
   }
   ```

3. **确保你已正确配置SSL/TLS**:

   为了使用HTTP/2，你还需要为你的站点配置SSL/TLS。这意味着你需要一个有效的SSL证书。如果你还没有，可以考虑使用[Let's Encrypt](https://letsencrypt.org/)获取一个免费的证书。

   在你的`server`块中，确保你已经设置了以下指令：
   ```
   ssl_certificate /etc/nginx/ssl/yourdomain.crt;
   ssl_certificate_key /etc/nginx/ssl/yourdomain.key;
   ```

4. **（可选）配置其他HTTP/2设置**:

   你还可以优化其他的HTTP/2相关设置，如`http2_push`和`http2_push_preload`，但这些是可选的，并取决于你的具体需求。

5. **测试配置并重启Nginx**:

   在应用任何更改后，总是建议测试Nginx配置的有效性：
   ```
   sudo nginx -t
   ```

   如果没有错误，可以安全地重启Nginx：
   ```
   sudo service nginx restart
   ```

完成以上步骤后，你的Nginx服务器应该已经启用了HTTP/2支持。你可以使用工具如[tools.keycdn.com/http2-test](https://tools.keycdn.com/http2-test)来验证你的站点是否已经成功启用了HTTP/2。