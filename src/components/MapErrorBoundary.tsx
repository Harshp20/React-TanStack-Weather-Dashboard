import { Component, type ErrorInfo, type ReactNode } from "react";

type MapErrorBoundaryProps = Readonly<{
	children: ReactNode;
}>;

type MapErrorBoundaryState = {
	hasError: boolean;
};

export default class MapErrorBoundary extends Component<
	MapErrorBoundaryProps,
	MapErrorBoundaryState
> {
	state: MapErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(): MapErrorBoundaryState {
		return { hasError: true };
	}

	componentDidCatch(error: Error, info: ErrorInfo) {
		console.error("Map failed to render:", error, info.componentStack);
	}

	render() {
		if (this.state.hasError) {
			return (
				<div
					className="flex min-h-[280px] w-full flex-col items-center justify-center gap-2 rounded-dashboard border border-dashboard-border bg-dashboard-card/80 p-6 text-center sm:min-h-[400px] lg:min-h-[500px]"
					role="alert"
				>
					<p className="text-dashboard-fg">Map could not be loaded.</p>
					<p className="text-subtle text-sm">
						Check your MapTiler API key and try refreshing the page.
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}
