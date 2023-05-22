import { prisma } from '../../prisma'
import { ConfigGateway } from '../../@types';

interface IGateway{
  serialPort: string,
  logLevel: number,
  integration: boolean,
  apiKey: string | null,
  clientApiUrl: string | null,
  readQueueInterval: number,
  wsConnection:boolean
}

export class Gateway{
  public _serialPort: string;
  public _logLevel: number;
  public _integration: boolean;
  public _apiKey: string | null;
  public _clientApiUrl: string | null;
  public _readQueueInterval: number;
  public _wsConnection: boolean;

  private constructor({serialPort, logLevel, integration, apiKey, clientApiUrl, readQueueInterval, wsConnection}:IGateway){
    this._serialPort = serialPort
    this._logLevel = logLevel
    this._integration = integration
    this._apiKey = apiKey
    this._clientApiUrl = clientApiUrl
    this._readQueueInterval = readQueueInterval
    this._wsConnection = wsConnection
  }

  static async create({serialPort, logLevel, integration, apiKey, clientApiUrl, readQueueInterval, wsConnection}:ConfigGateway){
    const interval = readQueueInterval ? readQueueInterval : 0
    if(integration){
      if(!apiKey) throw new Error('Para integração com API Aceno, apiKey é obrigatório')
    }
    const data = new Gateway({
      serialPort, 
      logLevel, 
      integration, 
      apiKey, 
      clientApiUrl: clientApiUrl ? clientApiUrl : '', 
      readQueueInterval:interval , 
      wsConnection
    })

    const gateway = await prisma.configGateway.create({
      data: {
        serialPort: data._serialPort,
        logLevel: data._logLevel,
        integration: data._integration,
        apiKey: data._apiKey,
        clientApiUrl: String(data._clientApiUrl),
        readQueueInterval: data._readQueueInterval,
        wsConnection: data._wsConnection
      }
    })

    return gateway
  }

  static async update(id: number, data: Partial<ConfigGateway>){
    const config = await prisma.configGateway.update({
      where:{
        id
      },
      data: data
    })
    return config
  }

  static async findAll(){
    const configs = await prisma.configGateway.findMany()

    return configs
  }
}