<template>
   <form action="submit_form" method="post" enctype="multipart/form-data">
  <label for="SongName">歌曲名稱:</label>
  <input type="text" id="SongName" name="SongName"><br><br>

  <label for="GenreName">音樂類型:</label>
<select id="GenreName" name="GenreName">
  <option value="rock">搖滾</option>
  <option value="pop">流行</option>
  <option value="jazz">爵士</option>
  <option value="blues">藍調</option>
</select><br><br>

  <label for="Duration">播放時間(秒):</label>
  <input type="number" id="Duration" name="Duration"><br><br>

  <label for="IsInstrumental">是否為純音樂:</label>
  <input type="checkbox" id="IsInstrumental" name="IsInstrumental" value="true"><br><br>

  <label for="Language">語言:</label>
  <input type="text" id="Language" name="Language"><br><br>

  <label for="IsExplicit">是否含有不當內容:</label>
  <input type="checkbox" id="IsExplicit" name="IsExplicit" value="true"><br><br>

  <label for="Released">發行日期:</label>
  <input type="date" id="Released" name="Released"><br><br>

  <label for="SongWriter">作曲家:</label>
  <input type="text" id="SongWriter" name="SongWriter"><br><br>

  <label for="Lyric">歌詞:</label>
  <textarea id="Lyric" name="Lyric" rows="5" cols="40"></textarea><br><br>

  <label for="Status">狀態:</label>
  <select id="Status" name="Status">
    <option value="published">已發布</option>
    <option value="unpublished">未發布</option>
  </select><br><br>

  <label for="AlbumId">專輯ID:</label>
  <input type="text" id="AlbumId" name="AlbumId"><br><br>

  <label for="Song">歌曲檔案:</label>
  <input type="file" id="Song" name="Song"><br><br>

  <label for="Cover">封面檔案:</label>
  <input type="file" id="Cover" name="Cover"><br><br>

  <input type="submit" value="提交">
</form>
</template>

<script>
  // 發出 HTTP GET 請求，獲取音樂類型
//   fetch('https://localhost:7043/Song/SongGenres',{
//     method:"GET",
//     credentials: "include",
//   })
    
</script>