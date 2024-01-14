import { NextApiResponseServerIo } from "@/types/socketServerType";
import { NextApiRequest } from "next";

import { Server as HttpServer } from 'http'
import { Server as ServerIO } from 'socket.io'

export const config = {
    api: {
        bodyParser: false,
    }
}

const ioHandler = async (req: NextApiRequest, res: NextApiResponseServerIo) => {


    if (!res.socket.server.io) {

        const path = "/api/socket/io";
        const httpServer: HttpServer = res.socket.server as any;
        const io = new ServerIO(httpServer,
            {
                path,
                addTrailingSlash: false,
                cors: { origin: "*" },
            }).listen(3100);

        io.on("connection", (socket: any) => {
            console.log(socket.id)
        })

        res.socket.server.io = io;
    }

    res.end()
}

export default ioHandler;