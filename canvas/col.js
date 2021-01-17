function drawColumn(columns) {
  for (let i = 0; i < columns.length; i++) {
      columns[i].x = !i ? 0 : columns[i - 1].width + columns[i - 1].x;
      columns[i].y = 0;
  }
  const ctx = wx.createCanvasContext('sleepCanvas');
  ctx.translate(0, 160);
  ctx.scale(1, -1);
  console.log(columns)
  columns.forEach(item => {
      if (item.height) {
          ctx.setFillStyle(item.color);
          ctx.beginPath();
          ctx.rect(item.x, item.y, item.width, item.height);
          ctx.fill();
          ctx.closePath();
      }
  })
  ctx.draw();
}