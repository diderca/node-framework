export interface Cache {
    get<T>(key: string|string[]): Promise<T>; // tslint:disable-line:no-reserved-keywords
    getTtl(key: string|string[]): Promise<number>;
    set<T>(key: string|string[], value: T, ttl?: number): Promise<void>; // tslint:disable-line:no-reserved-keywords
    del(key: string): Promise<void>;
    flush(): Promise<void>;
}
