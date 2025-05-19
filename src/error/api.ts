import type { ApiError, ResourceLocation } from './common';

export interface ResourceNotFound extends ApiError {
	readonly error: 'NOT_FOUND';
	readonly status: 404;
	readonly resources: ResourceLocation[];
}

export interface ConflictError extends ApiError {
	readonly error: 'CONFLICT';
	readonly status: 409;
	readonly resources: ResourceLocation[];
}

export const enum ApiErrorType {
	UnknownResponse = 'UNKNOWN_RESPONSE',
	InvalidResponseBody = 'INVALID_RESPONSE_BODY',
}

export class ApiClientError extends Error {
	public readonly type: ApiErrorType;
	public readonly data: unknown;

	constructor(type: ApiErrorType, data?: unknown, cause?: Error) {
		super('API Client error: ' + type, {
			cause,
		});
		this.type = type;
		this.data = data;
	}
}
