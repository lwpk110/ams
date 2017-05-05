import dva from "dva";
import {hashHistory} from "dva/router";
import "./vendor";
import "./layout.css";
import "./style.css";

const app = dva({
    history: hashHistory,
});

// Not meet ?....
//app.use(createLoading());
app.model(require('./models/app.model'));
app.model(require('./models/report.model'));
app.model(require('./models/masks.model'));
app.model(require('./models/channel.model'));
app.model(require('./models/taskreporting.model'));
app.model(require('./models/benchmarks.model'));
app.model(require('./models/marklog.model'));

app.router(require('./router'));

app.start('#container');
