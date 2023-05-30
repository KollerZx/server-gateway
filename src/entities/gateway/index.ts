import { prisma } from '../../prisma';
import { ConfigGateway } from '../../@types';

interface IGateway {
  serialPort: string,
  description: string,
  uid?: string
  logLevel: number,
  integration: boolean,
  apiKey: string | null,
  clientApiUrl: string | null,
  readQueueInterval: number,
  wsConnection: boolean,
  queue: string
  item: string
}

export class Gateway {
  public _serialPort: string;
  public _description: string;
  public _uid?: string;
  public _logLevel: number;
  public _integration: boolean;
  public _apiKey: string | null;
  public _clientApiUrl: string | null;
  public _readQueueInterval: number;
  public _wsConnection: boolean;
  public _queue: string
  public _item: string

  private constructor({ serialPort, description, uid, logLevel, integration, apiKey, clientApiUrl, readQueueInterval, wsConnection, queue, item }: IGateway) {
    this._serialPort = serialPort
    this._description = description
    this._uid = uid
    this._logLevel = logLevel
    this._integration = integration
    this._apiKey = apiKey
    this._clientApiUrl = clientApiUrl
    this._readQueueInterval = readQueueInterval
    this._wsConnection = wsConnection
    this._queue = queue
    this._item = item
  }

  static async create({ serialPort, logLevel, description, uid, integration, apiKey, clientApiUrl = '', readQueueInterval = 0, wsConnection, queue, item }: IGateway) {
    if (
      !serialPort ||
      !logLevel ||
      !description
    ) {
      throw new Error('serialPort, logLevel, description e uid são obrigatórios')
    }
    if (integration || wsConnection) {
      if (!apiKey) throw new Error('Para integração com API Aceno, apiKey é obrigatório')
    }
    const data = new Gateway({
      serialPort,
      logLevel,
      description,
      uid,
      integration,
      apiKey,
      clientApiUrl,
      readQueueInterval,
      wsConnection,
      queue,
      item
    })

    const gateway = await prisma.configGateway.create({
      data: {
        serialPort: data._serialPort,
        description: data._description,
        uid: data._uid,
        logLevel: data._logLevel,
        integration: data._integration,
        apiKey: data._apiKey,
        clientApiUrl: String(data._clientApiUrl),
        readQueueInterval: data._readQueueInterval,
        wsConnection: data._wsConnection,
        queue: data._queue,
        item: data._item
      }
    })

    return gateway
  }

  static async update(id: number, data: Partial<IGateway>) {
    const config = await prisma.configGateway.update({
      where: {
        id
      },
      data
    })
    return config
  }

  static async findAll() {
    const configs = await prisma.configGateway.findMany()

    return configs
  }
}