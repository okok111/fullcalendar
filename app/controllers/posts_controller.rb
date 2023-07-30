class PostsController < ApplicationController
  before_action :authenticate_user! , except: [:show, :index]
    def index
    # start_date = params.fetch(:start_date, Date.today).to_date
    # @events = Post.where('start_time <= ? AND (end_time >= ? OR end_time IS NULL)', start_date.end_of_month.end_of_week, start_date.beginning_of_month.beginning_of_week)
    # puts @events.inspect
        @posts = Post.all
        if params[:tag_ids]
            @posts = []
            params[:tag_ids].each do |key, value|
                if value == "1"
                    tag_posts = Tag.find_by(name: key).posts
                    @posts = @posts.empty? ? tag_posts : @posts & tag_posts
                end
            end
        end
    end

  def new
      @post = Post.new
  end

  def create
      post = Post.new(post_params)
      post.user_id = current_user.id
      if post.save
          redirect_to :action => "index"
      else
          redirect_to :action => "new"
      end
  end
  def show
        @post = Post.find(params[:id])
        @comments = @post.comments
        @comment = Comment.new
        
        @tags = @post.tags
        @related_posts = []
        @tags.each do |tag|
            tag.posts.each do |post|
                @related_posts << post unless post == @post
            end
        end
  end

  def edit
      @post = Post.find(params[:id])
  end

  def update
      post = Post.find(params[:id])
      if post.update(post_params)
          redirect_to :action => "show", :id => post.id
      else
          redirect_to :action => "new"
      end
  end

  def destroy
      post = Post.find(params[:id])
      post.destroy
      redirect_to action: :index
  end

  private
  def post_params
      params.require(:post).permit(:title, :contents ,:image ,:birthday ,:start_time,:end_time, tag_ids: [])
  end

end
