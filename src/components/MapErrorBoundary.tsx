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
					className="flex min-h-[500px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-mist-800 bg-mist-900/80 p-6 text-center"
					role="alert"
				>
					<p className="text-white">Map could not be loaded.</p>
					<p className="text-subtle text-sm">
						Check your MapTiler API key and try refreshing the page.
					</p>
				</div>
			);
		}

		return this.props.children;
	}
}
