interface CPUPerformance {
    manufacturer: string;
    brand: string;
    speed: number;
    cores: number;
    physicalCores: number;
    processors: number;
}
export declare function name(): string;
export declare function storage_capacity(): Promise<number>;
export declare function cpu_info(): Promise<CPUPerformance>;
export declare function cpu_usage(): Promise<number>;
export declare function gpu_usage(): Promise<number>;
export declare function ram_usage(): Promise<number>;
export declare function ram_total(): Promise<number>;
export declare function ram_free(): Promise<number>;
export declare function ip_address(): Promise<string>;
export declare function directory_info(username: any): Promise<any[]>;
export {};
