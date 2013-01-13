require.config({
    baseUrl: 'js/lib'
    ,
     paths:{

    	jquery:"jquery-1.8.2.min",
    	bootstrap:"bootstrap.min",
   
    }
});

requirejs(["jquery","bootstrap",'../app']);
