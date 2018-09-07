/*  第三方上传方法
*   1 阿里身份验证接口
*   2 阿里营业执照验证接口
*   3 人脸识别接口
*   4 身份证工信网识别接口
*/

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *   通过file 上传图片
 *  参数 imgPath 表示图片路径
 */
export const getFileData = async e => {
  var e = e || window.event; 
  if (e.target.files[0]) {
    let files = e.target.files[0] || e.dataTransfer.files[0];

    //   读取文件
    var reader = new FileReader();
    reader.readAsDataURL(files);
    return await new Promise((resolve, reject) => {
      reader.onload = function(event) {
        var dataURL = event.target.result;
        let _dataURL = dataURL.replace(
          /^data:image\/(jpeg|png|gif);base64,/,
          ""
        );
        // console.log({
        //   files: files,
        //   dataURL: dataURL,
        //   _dataURL: _dataURL
        // })
        // 返回 含头部的base64  和不含头部的base64
        resolve({
          files: files,
          dataURL: dataURL,
          _dataURL: _dataURL
        });
      };
    });
  }else{
    return {
      files: "",
      dataURL: "",
      _dataURL: "",
    }
  }
};

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *  获取img的图片地址, 转为base64位
 *  参数 imgPath 表示图片路径
 */
export const imageUpAjax = async imgPath => {
  var image = new Image();
  //   img传输完毕后 上传给后台
  return await new Promise((resolve, reject) => {
    image.onload = function() {
      var imgData = getBase64Image(image); 
      /*在这里调用上传接口*/
      //返回base64位数据
      return imgData;
    };
  });
  image.src = imgPath;
  //   image.style.width = "60px";
  //   image.style.height = "60px";
};

/** * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 *将图片压缩转成base64
 *
 *
 */

function getBase64Image(img) {
  var canvas = document.createElement("canvas");
  var width = img.width;
  var height = img.height;
  // calculate the width and height, constraining the proportions
  if (width > height) {
    if (width > 400) {
      height = Math.round((height *= 400 / width));
      width = 400;
    }
  } else {
    if (height > 400) {
      width = Math.round((width *= 400 / height));
      height = 400;
    }
  }
  canvas.width = width; /*设置新的图片的宽度*/
  canvas.height = height; /*设置新的图片的长度*/
  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height); /*绘图*/
  var dataURL = canvas.toDataURL("image/png", 0.8);
  return dataURL.replace("data:image/png;base64,", "");
}
