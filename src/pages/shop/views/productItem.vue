<script>
export default {

}
</script>


<template lang="">
    <div>
        <div class="img">圖片
            <div class=add>
                <div class="info">專輯資料</div>
                    <div class="btn">
                        <button type="button" @click="getMemberId" class="btn btn-light">加入購物車</button>
                        <button type="button" @click="getCartInfo" class="btn btn-light">直接購買</button>
                    </div>
                </div>
            </div>
        </div>

    <hr>
        <div class="introduce">
            <h2>專輯介紹</h2>
                     
        </div>
    <hr>

        <div class="songs">
            <h2>專輯歌曲</h2>
            
            
        </div>
</template>


<style  lang="scss" scoped>

*{
    margin-left: 100px;
    
}
.img{
    display: flex;
    align-items: center; 
    font-size: 154px;
    color: #b83e3e;
    height: auto;
    > .add{
        display: flex;
        flex-direction: column;
        > .info{
            font-size: 54px;
            height: 30%;
        }
        > .btn{
            height: 10%;
        }
    }
}

.introduce{
    height: 200px;
    
   
}
.songs{
    height: 200px;
   
    
}

</style>










  