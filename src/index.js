import { palletPicker } from "./palletPicker";
document.body.append(palletPicker((value)=>{
    document.body.append(value)
}))