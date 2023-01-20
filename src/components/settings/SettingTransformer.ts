import ITransformer from "../contracts/ITransformer";
import ISetting from "./model/ISetting";

export default class SettingTransformer implements ITransformer<ISetting> {
    transform = (item: ISetting) => {
        return {
            id: item._id,
            title: item.title,
            settingKey: item.key,
            settingValue: item.value,
            scope: item.scope,
            version: item.version,
        };
    };

    collection = (items: ISetting[]) => {
        return items?.map((item: ISetting) => this.transform(item));
    };
}
