var photocell;
var button;
var rgbled;
var photocell2;
var button2;
var rgbled2;
var newid1;
var newid2;
function top1check(){
	c2_callFunction("p1check");
}
function top2check(){
	c2_callFunction("p2check");
}
function toca1check(){
	c2_callFunction("ca1check");
}
function toca2check(){
	c2_callFunction("ca2check");
}
function colour_random() {
  var num = Math.floor(Math.random() * Math.pow(2, 24));
  return '#' + ('00000' + num.toString(16)).substr(-6);
}
function newid(){
newid1 = prompt('請輸入P1 DeviceID' , '10dKw7Jd');
boardReady({board: 'Smart', device: newid1, transport: 'mqtt'}, function (board) {
  board.samplingInterval = 20;
  rgbled = getRGBLedCathode(board, 15, 12, 13);
  button = getButton(board, 4);
  photocell = getPhotocell(board, 0);
  photocell.measure(function (val) {
    photocell.detectedVal = val;
    if (photocell.detectedVal <= 0.2) {
      rgbled.setColor(colour_random() , function () {
		toca1check();
      });
    } else if (photocell.detectedVal > 0.2) {
      rgbled.setColor('#000099');
    }
  });
  button.on('pressed', function () {
    rgbled.setColor('#ff0000' , function () {
		top1check();
    });
  });
});
newid2 = prompt('請輸入P2 DeviceID' , '');
boardReady({board: 'Smart', device: newid2, transport: 'mqtt'}, function (board) {
  board.samplingInterval = 20;
  rgbled2 = getRGBLedCathode(board, 15, 12, 13);
  button2 = getButton(board, 4);
  photocell2 = getPhotocell(board, 0);
  photocell2.measure(function (val) {
    photocell2.detectedVal = val;
    if (photocell2.detectedVal <= 0.2) {
      rgbled2.setColor(colour_random() , function () {
		toca2check();
      });
    } else if (photocell2.detectedVal > 0.2) {
      rgbled2.setColor('#000099');
    }
  });
  button2.on('pressed', function () {
    rgbled2.setColor('#ff0000' , function () {
		top2check();
    });
  });
});
}