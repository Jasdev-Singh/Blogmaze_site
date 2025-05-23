import {db} from "../db.js";
export const getPosts = (req,res) =>{
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat= ?" : "SELECT * FROM posts";
    db.query(q,[req.query.cat], (err,data)=>{
        if (err) return res.status(500).send(err);

        return res.status(200).json(data);
    });
}
//fetch data to show on single page
export const getPost = (req,res) =>{
    //find post using its id, join users table to get username
    const q = "SELECT u.id as userid, p.id,`username`,`title`,`desc`,p.img,u.img AS userimg,`cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?"
    db.query(q,[req.params.id],(err,data)=>{
        if (err) return res.status(500).json(err);

        return res.status(200).json(data[0]);  //it return array so we take 1st time only
    });

};

export const addPost = (req,res) =>{


    const q = 'INSERT INTO posts(`title`,`desc`,`img`,`cat`,`date`,`uid`) values (?)'
    
    const values = [req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
        req.body.date,
        req.body.uid,
       
    ]

    db.query(q,[values],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.json("post has been created");
    });

};

export const deletePost = (req,res) =>{
    const postid=req.params.id
    const q  = 'DELETE FROM Blogmaze_site.posts WHERE `id` = ?; UPDATE Blogmaze_site.posts SET `id` = `id`-1 where `id` > ?; set @nextId := (select IFNULL(max(id),0)+1 from Blogmaze_site.posts); set @sql := CONCAT("alter table Blogmaze_site.posts AUTO_INCREMENT= " , @nextId); PREPARE stmt FROM @sql; EXECUTE stmt; DEALLOCATE PREPARE stmt;' ; 
    db.query(q,[postid,postid],(err,data)=>{
        if (err) return res.status(403).json("You can delete only your post!");

        return res.json("Post has been deleted")
    })
    
};
export const updatePost = (req,res) =>{

    const postid = req.params.id;
    const q = 'UPDATE posts SET `title`=?,`desc`=?,`img`=?,`cat`=? WHERE `id`=?';
    const values = [req.body.title,
        req.body.desc,
        req.body.img,
        req.body.cat,
    ]

    db.query(q,[...values,postid],(err,data)=>{
        if(err) return res.status(500).json(err);
        return res.json("post has been updated");
    });

}
