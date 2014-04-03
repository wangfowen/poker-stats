require 'sinatra'

set :public_folder, File.dirname(__FILE__) + '/static'

get '/' do
	'Enter a custom url, e.g. "/owen"'
end

get '/:name' do |n|
	erb :index, :locals => { :name => params[:name] }
end
