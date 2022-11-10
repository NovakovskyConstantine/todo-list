export interface CommonService {
    useApi(route: string[], params: any): Promise<any>;
}