require "json"

baseDir = "_data/music"

File.open("api/music.json", "w") do |music_index|
  artists = Dir.entries(baseDir).select {|f| !File.directory? f}.map {|f| { "artist" => f.sub(".yml", ""), "url" => "/api/music/#{f.sub('.yml', '.json')}"}}
  music_index.write(artists.to_json)
end
