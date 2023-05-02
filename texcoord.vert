	precision highp float;
	attribute vec3 aPosition;
	attribute vec2 aTexCoord;
	varying vec2 uv;
	
	void main(){
		uv = aTexCoord;
		vec4 positionVec4 = vec4(aPosition,1.);
		positionVec4.xy = positionVec4.xy * 2.0 -1.;
		gl_Position = positionVec4;
	}