require 'rails_helper'

describe UsersController do
  let!(:user) { User.create!(email: Faker::Internet.email, name: Faker::Name.name, password: "catcatcat", interests: Faker::Lorem.sentence, skills: Faker::Lorem.sentence, twitter_handle: Faker::Lorem.word, description: Faker::Lorem.paragraph)}

  before do
    puts user
    sign_in user
  end

  describe "GET show" do
    it "assigns a user as @user" do
      #puts User.find_by(name: user.name).name
      get :show, {id: user.id}
      expect(assigns(:user)).to be_a(User)
    end
  end
end