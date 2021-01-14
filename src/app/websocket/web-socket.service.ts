import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    ws: WebSocket;

    constructor() {
    }

    createObservableSocket(url: string): Observable<any> {
        console.log(url);
        this.ws = new WebSocket(url); // 去连接url的服务器
        /* 响应式编程Observable 三步走 */
        return new Observable(
            observer => {
                this.ws.onmessage = ev => observer.next(ev.data); // 1. 当ws收到消息时发射数据
                this.ws.onerror = err => observer.error(err); // 2. 处理异常
                this.ws.onclose = () => observer.complete(); // 3. 完成操作
            }
        );
    }
    close() {
        this.ws.close();
    }
    sendMessage(message: string) {
        this.ws.send(message);
    }
}
