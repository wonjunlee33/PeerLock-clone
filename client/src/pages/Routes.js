import {
	BrowserRouter as Router,
	Route,
	Routes as ReactRouterRoutes,
	Navigate,
} from 'react-router-dom';
import HomeHost from './Home/HomeHost';
import HomeGuest from './Home/HomeGuest';
import Chat from './Chat/Chat';
import ChatHost from './Chat/ChatHost';
import Wish from './Wish/Wish';
import MyGuest from './My/MyGuest';
import MyHost from './My/MyHost';
import MapScreen from './Map/MapScreen';
import Storage from './Storage/Storage';
import StorageDetailPage from './Storage/StorageDetailPage';
import Login from './Home/Login';
import StoreagReservationPage from './Storage/StoreagReservationPage';
import StoreagReservationUploadPage from './Storage/StorageReservationUploadPage';
import MyStoragePage from './My/MyStoragePage';
import ReviewPage from './Review/Review';
import StorageRegist from './Storage/StorageRegist';
import FinanceHost from './Finance/FinanceHost';

export const Routes = () => {
	return (
		<Router>
			<ReactRouterRoutes>
				<Route exact path="/" element={<Login />} />
				<Route exact path="/homehost" element={<HomeHost />} />
				<Route exact path="/homeguest" element={<HomeGuest />} />
				<Route exact path="/chat" element={<Chat />} />
				<Route exact path="/chatHost" element={<ChatHost />} />
				<Route exact path="/map" element={<MapScreen />} />
				<Route exact path="/wish" element={<Wish />} />
				<Route exact path="/myGuest" element={<MyGuest />} />
				<Route exact path="/myHost" element={<MyHost />} />
				<Route exact path="/storage" element={<Storage />} />
				<Route exact path="/mystorage/regist" element={<StorageRegist />} />
				<Route exact path="/login" element={<Login />} />
				<Route exact path="/storage/detail/:storageId" element={<StorageDetailPage />} />
				<Route exact path="/storage/reservation/:storageId" element={<StoreagReservationPage />} />
				<Route
					exact
					path="/storage/reservation/upload/:storageId"
					element={<StoreagReservationUploadPage />}
				/>
				<Route
					exact
					path="/storage/reservation/confirm/:storageId"
					element={<StoreagReservationPage />}
				/>
				<Route exact path="/finance" element={<FinanceHost />} />
				<Route exact path="/mystorage" element={<MyStoragePage />} />
				<Route exact path="/review" element={<ReviewPage />} />
				<Route path="*" element={<Navigate replace to="/" />} />
			</ReactRouterRoutes>
		</Router>
	);
};
