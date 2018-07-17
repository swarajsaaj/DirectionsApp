/**
 * Response for route fetch service.
 */
export class RouteResponse {
	public status: string;
	public path: string[][];
	public total_distance: number;
	public total_time: number;
	public error: string;
}
