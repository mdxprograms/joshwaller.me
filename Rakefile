desc "jekyll serve"
task :jekyll_serve do
  puts "Jekyll running @ http://localhost:4000"
  system("bundle exec jekyll b -w")
end

desc "parcel watch"
task :parcel_watch do
  system("npm run watch:js")
end

desc "dev server"
task :live_server do
  system("npm run live-server")
end

desc "Run dev"
task :start do
  threads = []
  %w{jekyll_serve parcel_watch live_server}.each do |t|
    threads << Thread.new(t) do |a_task|
      Rake::Task[a_task].invoke
    end
  end
  threads.each { |thread| thread.join }
end

desc "Run build"
task :build do
  system("echo '===Compile js==='")
  system("npm run build:js")
  system("echo '===Build Jekyll==='")
  system("bundle exec jekyll b")
end
