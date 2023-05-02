 
	precision highp float;
	varying vec2 uv;
	uniform sampler2D tex;
	uniform float density;
	uniform float disp;
	uniform float offset;
	
	float rand(vec2 uv){
		float noiseFloat = 33535.0;
		float temp = uv.x * uv.y * noiseFloat;
		float r = fract(sin(temp) * noiseFloat);
		return r;
	}
	
	void main(){
        float disp = disp;
        if(disp == 0.0) disp = 1.0;
		float r = rand(uv * disp);
		float off = offset;
		vec3 noise = vec3((r+off) * density);
		vec4 color = texture2D(tex,vec2(uv.x, 1.0 - uv.y));
		gl_FragColor = color + vec4(noise, 0.0);
    }