import { Redirect, Route } from "react-router-dom"
import { QueryClient } from "@tanstack/react-query"
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client"
import {
	IonApp,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs,
	setupIonicReact,
} from "@ionic/react"
import { IonReactRouter } from "@ionic/react-router"
import { discOutline, searchOutline, personOutline } from "ionicons/icons"
import { CollectionPage, ProfilePage, SearchPage } from "./pages"
import { createIDBPersister } from "./persister"

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css"

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css"
import "@ionic/react/css/structure.css"
import "@ionic/react/css/typography.css"

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css"
import "@ionic/react/css/float-elements.css"
import "@ionic/react/css/text-alignment.css"
import "@ionic/react/css/text-transformation.css"
import "@ionic/react/css/flex-utils.css"
import "@ionic/react/css/display.css"

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import "@ionic/react/css/palettes/dark.always.css"
/* import '@ionic/react/css/palettes/dark.class.css'; */
/* import '@ionic/react/css/palettes/dark.system.css'; */

/* Theme variables */
import "./theme/variables.css"

setupIonicReact({
	mode: "ios",
})

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			gcTime: 1000 * 60 * 60 * 24 * 24, // 24 days, the theoretical max
		},
	},
})

const persister = createIDBPersister()

const App: React.FC = () => (
	<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
		<IonApp>
			<IonReactRouter>
				<IonTabs>
					<IonRouterOutlet>
						<Route exact path="/collection">
							<CollectionPage />
						</Route>
						<Route exact path="/profile">
							<ProfilePage />
						</Route>
						<Route path="/search">
							<SearchPage />
						</Route>
						<Route exact path="/">
							<Redirect to="/collection" />
						</Route>
					</IonRouterOutlet>
					<IonTabBar slot="bottom" translucent>
						<IonTabButton tab="collection" href="/collection">
							<IonIcon aria-hidden="true" icon={discOutline} />
							<IonLabel>Collection</IonLabel>
						</IonTabButton>
						<IonTabButton tab="profile" href="/profile">
							<IonIcon aria-hidden="true" icon={personOutline} />
							<IonLabel>Profile</IonLabel>
						</IonTabButton>
						<IonTabButton tab="search" href="/search">
							<IonIcon aria-hidden="true" icon={searchOutline} />
							<IonLabel>Search</IonLabel>
						</IonTabButton>
					</IonTabBar>
				</IonTabs>
			</IonReactRouter>
		</IonApp>
	</PersistQueryClientProvider>
)

export default App
