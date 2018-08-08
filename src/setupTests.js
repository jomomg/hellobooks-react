import 'jest-enzyme';
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

let mockStorage = {};
const localStorageMock = {
    getItem: (item) => {
        return mockStorage[item]
    },
    setItem: (key, value) => {
        mockStorage[key] = value;
    },
    clear: jest.fn()
};

global.localStorage = localStorageMock;
let sampleAccessToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MzM" +
    "3NDQ2OTcsIm5iZiI6MTUzMzc0NDY5NywianRpIjoiNW" +
    "YyOTU1Y2UtZTk5MS00ZDdmLWJjMTctNDViMzllZDA2MDk5I" +
    "iwiZXhwIjoxNTMzNzQ4Mjk3LCJpZGVudGl0eSI6ImpvbW9AdXNlci5jb20iLCJm" +
    "cmVzaCI6ZmFsc2UsInR5cGUiOiJhY2Nlc3MiLCJ1c2VyX2NsYWltcyI6eyJmaXJzdF9uYW1l" +
    "IjoiSm9tbyIsImxhc3RfbmFtZSI6IkdpdGF1IiwiaXNfYWRtaW4iOnRydWV9fQ.3JRLSC" +
    "tXekxehlw6tnitAILOs_xV7yWAXs5QfpQJKEI";
localStorage.setItem('accessToken', sampleAccessToken);
localStorage.setItem('isAuthenticated', 'false');
configure({ adapter: new Adapter() });