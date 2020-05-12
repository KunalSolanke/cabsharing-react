# Now we want to use data from the redis server 

we will do it using the models : 


         class Message(models.Model) :
    author     = models.ForeignKey(User,related_name="author_messages",on_delete=models.CASCADE)
    timestamp  = models.DateTimeField(auto_now_add=True)
    content   =   models.TextField()

    def __str__(self) :
        return self.author.username



We will use it in the consumers :
    with with we will add two methods