
    //address=""搜索蓝牙//address=设备mac地址，自动配对给出mac地址的设备
    function searchDevices(address) {
    //注册类
    var main = plus.android.runtimeMainActivity();
    var IntentFilter = plus.android.importClass('android.content.IntentFilter');
    var BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
    var BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice");
    var BAdapter = BluetoothAdapter.getDefaultAdapter();
    console.log("开始搜索设备");
    var filter = new IntentFilter();
    var bdevice = new BluetoothDevice();
    var on = null;
    var un = null;
    var vlist1 = document.getElementById('list1'); //注册容器用来显示未配对设备
    vlist1.innerHTML = ''; //清空容器
    var vlist2 = document.getElementById('list2'); //注册容器用来显示未配对设备
    vlist2.innerHTML = ''; //清空容器
    var button1 = document.getElementById('bt1');
    button1.disabled = true;
    button1.value = '正在搜索请稍候';
    BAdapter.startDiscovery(); //开启搜索
    var receiver;
    receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
    onReceive: function(context, intent) { //实现onReceiver回调函数
    plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作
    console.log(intent.getAction()); //获取action
    if(intent.getAction() == "android.bluetooth.adapter.action.DISCOVERY_FINISHED") {
    main.unregisterReceiver(receiver); //取消监听
    button1.disabled = false;
    button1.value = '搜索设备';
    console.log("搜索结束")
} else {
    BleDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE);
    //判断是否配对
    if(BleDevice.getBondState() == bdevice.BOND_NONE) {
    console.log("未配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
    //参数如果跟取得的mac地址一样就配对
    if(address == BleDevice.getAddress()) {
    if(BleDevice.createBond()) { //配对命令.createBond()
    console.log("配对成功");
    var li2 = document.createElement('li'); //注册
    li2.setAttribute('id', BleDevice.getAddress()); //打印机mac地址
    li2.setAttribute('onclick', 'printIndex(id)'); //注册click点击列表进行打印
    li2.innerText = BleDevice.getName();
    vlist2.appendChild(li2);
}

} else {
    if(BleDevice.getName() != on) { //判断防止重复添加
    var li1 = document.createElement('li'); //注册
    li1.setAttribute('id', BleDevice.getAddress()); //打印机mac地址
    li1.setAttribute('onclick', 'searchDevices(id)'); //注册click点击列表进行配对
    on = BleDevice.getName();
    li1.innerText = on;
    vlist1.appendChild(li1);

}

}
} else {
    if(BleDevice.getName() != un) { //判断防止重复添加
    console.log("已配对蓝牙设备：" + BleDevice.getName() + '    ' + BleDevice.getAddress());
    var li2 = document.createElement('li'); //注册
    li2.setAttribute('id', BleDevice.getAddress()); //打印机mac地址

    li2.setAttribute('onclick', 'printIndex(id)'); //注册click点击列表进行打印
    un = BleDevice.getName();
    li2.innerText = un;
    vlist2.appendChild(li2);
}
}
}

}
});

    filter.addAction(bdevice.ACTION_FOUND);
    filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);
    filter.addAction(BAdapter.ACTION_DISCOVERY_FINISHED);
    filter.addAction(BAdapter.ACTION_STATE_CHANGED);

    main.registerReceiver(receiver, filter); //注册监听
}

    var device = null,
    BAdapter = null,
    BluetoothAdapter = null,
    uuid = null,
    main = null,
    bluetoothSocket = null;

    function printIndex(molList) {
    var total = 1;
    var btnArray = ['确定', '取消'];
    mui.prompt('请输入打印数量...', total, '', btnArray, function(e) {
    if(e.index == 0) {
    total = parseFloat(e.value);
    if(total == 0) {
    alert("请输入大于0的数量!");
    return false;
} else {
    print(molList, total);
}
} else {
    mui.toast("已取消");
}
});
}

    function print(molList, total) {
    g.showWaiting("标签打印中,请稍等...");
    var mac_address = localStorage.getItem("macaddress");
    if(!mac_address) {
    mui.toast('请选择蓝牙打印机');
    return;
}
    localStorage.setItem("macaddress", mac_address);
    //alert(localStorage.getItem("macaddress"));
    main = plus.android.runtimeMainActivity();
    BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter");
    UUID = plus.android.importClass("java.util.UUID");
    uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB");
    BAdapter = BluetoothAdapter.getDefaultAdapter();
    device = BAdapter.getRemoteDevice(mac_address);
    plus.android.importClass(device);
    bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
    plus.android.importClass(bluetoothSocket);

    if(!bluetoothSocket.isConnected()) {
    console.log('检测到设备未连接，尝试连接....');
    bluetoothSocket.connect();
}

    console.log('设备已连接');

    if(bluetoothSocket.isConnected()) {
    //    alert(bluetoothSocket.isConnected());
    var outputStream = bluetoothSocket.getOutputStream();
    plus.android.importClass(outputStream);
    var wlbm = molList.MATERIAL_CODE.slice(-10);
    var wlms = molList.MATERIAL_DESCRIPTION;
    var ddh = molList.ORDER_NUMBER;
    var sl = molList.CHECK_SUM;
    var dw = molList.SALES_UNIT;

    var string = "^XA^MNW^JUS^CI28" +
    "^FO15,25" +
    "^MD" +
    "^A@N,20,20,E:HANS.TTF" +
    //"^A@N,20,20,E:SIMSUN.TTF" +
    "^FD" + wlbm + "^FS" +
    "^FO15,55" +
    "^A@N,20,20,E:HANS.TTF" +
    "^FD名称:" + wlms + "^FS" +
    "^FO15,85" +
    "^A@N,20,20,E:HANS.TTF" +
    "^FD订单号:" + ddh + "^FS" +
    "^FO15,115" +
    "^A@N,20,20,E:HANS.TTF" +
    "^FD到货日期:" + app.PSTNG_DATE + "        数量:" + sl + "^FS" +
    "^FO15,145" +
    "^A@N,20,20,E:HANS.TTF" +
    "^FD工厂:5020                                单位:" + dw + "^FS" +
    "^FO55,175^BY1.8" +
    "^BCN,50,Y,N,N" +
    "^FD" + wlbm + "^FS" +
    "^PQ" + total + ",2,1,Y" +
    "^XZ";

    var bytes = plus.android.invoke(string, 'getBytes', 'UTF-8');
    outputStream.write(bytes);
    outputStream.flush();
    g.closeWaiting();

    device = null //这里关键
    bluetoothSocket.close(); //必须关闭蓝牙连接否则意外断开的话打印错误

}
}