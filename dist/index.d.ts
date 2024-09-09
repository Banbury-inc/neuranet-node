import * as device from './device';
import * as handlers from './handlers';
import * as networking from './networking';
import * as sessions from './sessions';
import * as types from './types';
import * as utils from './utils';
import * as devices from './devices';
import * as files from './files';
/**
 * The main entry point for the neuranet library.
 */
export declare const neuranet: {
    device: typeof device;
    handlers: typeof handlers;
    networking: typeof networking;
    sessions: typeof sessions;
    types: typeof types;
    utils: typeof utils;
    devices: typeof devices;
    files: typeof files;
};
