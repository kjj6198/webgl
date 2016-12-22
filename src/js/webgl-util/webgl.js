export function getContext(canvas, options = {}) {
  let contexts = ["webgl", "experimental-webgl"];
  let context = null;

  contexts.some(name => {
    try {
      context = canvas.getContext(name,options);
    } catch(e) {};

    return context != null;
  });

  if(context == null){
    document.body.classList.add("no-webgl");
  }

  return context;
}

export function createShader(gl, type, shaderScript) {
  var shader;

  switch(type) {
    case 'fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    case 'vertex':
      shader = gl.createShader(gl.VERTEX_SHADER);
      break;
  }

  gl.shaderSource(shader, shaderScript);
  gl.compileShader(shader);
  
  return shader;
}

export function createProgram(gl, vertexScript, fragScript){
  const vertexShader = createShader(gl, 'vertex', vertexScript);
  const fragShader = createShader(gl, 'fragment', fragScript);

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  gl.useProgram(program);
  const linked = gl.getProgramParameter(program, gl.LINK_STATUS);

  if (!linked) {
      var lastError = gl.getProgramInfoLog(program);
      error("Error in program linking: " + lastError);
      gl.deleteProgram(program);
      return null;
  }

  return program;
}


export function createTexture(gl, source, i, wrap = null){
  if (wrap == null) wrap = gl.CLAMP_TO_EDGE;
  var texture = gl.createTexture();
  activeTexture(gl,i);
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
  // Set the parameters so we can render any size image.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  updateTexture(gl, source);

  return texture;
}
