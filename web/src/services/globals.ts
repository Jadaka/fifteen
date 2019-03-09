import Api from './Api';
import Auth from './Auth';

type Service = (Api|Auth)

const globals: Map<ServiceName, Service> = new Map();

export enum ServiceName {
  API = "API",
  AUTH = "AUTH",
}

export const getService = (name: ServiceName): Service => {
  const service: Service|undefined = globals.get(name);
  if (!service) {
    throw Error(`Global service ${name} has not been set yet. Be sure to call setService first.`);
  }
  return service;
}

export const setService = (name: ServiceName, service: Service): void => {
  if (globals.has(name)) {
    console.log(`A ${name} service has already been set. Ignoring.`);
    return;
  }
  globals.set(name, service);
}
