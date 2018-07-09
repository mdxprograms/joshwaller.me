require "json"
require "yaml"

def generate_music_api
  base_dir = "_data/music"
  music_dir = "api/music"
  music_index_path = "api/music.json"

  # generate music.json content based on _data/music file names
  File.open(music_index_path, "w") do |music_index|
    artists = Dir.entries(base_dir).select {|f| !File.directory? f}.map {|f| { "artist" => f.sub(".yml", ""), "url" => "/api/music/#{f.sub('.yml', '.json')}"}}
    music_index.write(artists.to_json)
  end

  # generate json files based on _data/music files
  Dir.entries(base_dir).select {|f| !File.directory? f}.each do |filename|
    yaml_file = File.open("#{base_dir}/#{filename}", "r")
    yaml_info = yaml_file.read
    yaml_file.close

    output = JSON.dump(YAML::load(yaml_info))
    output_file = File.open(music_dir + "/" + filename.sub('.yml', '.json'), "w+")
    output_file.write(output)
    output_file.close
  end
end
