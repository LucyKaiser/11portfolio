document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  let centerX = canvas.width / 2;
  let centerY = canvas.height / 2;
  canvas.style.background = "rgb(26, 26, 26)";

  function random(min, max) {
    // console.log("function random called");
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // From https://stackoverflow.com/a/9493060
  function hue_to_rgb(p, q, t) {
    // console.log("function hue to rgb called");
    if (t < 0) {
      t = t + 1;
    }
    if (t > 1) {
      t = t - 1;
    }
    if (t < 1 / 6) {
      return p + (q - p) * 6 * t;
    }
    if (t < 1 / 2) {
      return q;
    }
    if (t < 2 / 3) {
      return p + (q - p) * (2 / 3 - t) * 6;
    }
    return p;
  }

  function hsl_to_rgb(h, s, l) {
    // console.log("function hsl to rgb called");
    let p = 0;
    let q = 0;
    if (s == 0) {
      r = l;
      g = l;
      b = l;
    } else {
      if (l < 0.5) {
        q = l * (1 + s);
      } else {
        q = l + s - l * s;
      }
      p = 2 * l - q;
      r = hue_to_rgb(p, q, h + 1 / 3);
      g = hue_to_rgb(p, q, h);
      b = hue_to_rgb(p, q, h - 1 / 3);
    }
    r = Math.round(r * 255);
    g = Math.round(g * 255);
    b = Math.round(b * 255);
    let rgbValue = { r: r, g: g, b: b };
    return rgbValue;
  }

  // removes decimal, returns full number
  function truncate(truncate_number) {
    // console.log("function truncate called")
    if (truncate_number >= 0) {
      //force Math.round down
      return Math.round(truncate_number - 0.5);
    } else {
      //Math.round up since its negative
      return Math.round(truncate_number + 0.5);
    }
  }

  function calculate_offset(numberOfVertices, radius) {
    // console.log("function calculate offset called");
    // assume first point is min && max
    y_min =
      centerY +
      radius * Math.sin((-90 + (1 * 360) / numberOfVertices) * (Math.PI / 180));
    y_max = y_min;

    // loop through the other vertices to find the actual min && max
    for (let i = 2; i <= numberOfVertices; i++) {
      current_y =
        centerY +
        radius *
          Math.sin((-90 + (i * 360) / numberOfVertices) * (Math.PI / 180));
      if (current_y < y_min) {
        y_min = current_y;
      }
      if (current_y > y_max) {
        y_max = current_y;
      }
    }

    shape_height = y_max - y_min;
    shape_center_y = y_min + shape_height / 2;

    return centerY - shape_center_y;
  }

  function get_vertex_coord(
    which_coord,
    vertex_index,
    numberOfVertices,
    radius,
  ) {
    // console.log("function get vertex coord called");
    if (which_coord == "x") {
      return (
        centerX +
        radius *
          Math.cos(
            (-90 + (vertex_index * 360) / numberOfVertices) * (Math.PI / 180),
          )
      );
    }
    if (which_coord == "y") {
      return (
        centerY +
        radius *
          Math.sin(
            (-90 + (vertex_index * 360) / numberOfVertices) * (Math.PI / 180),
          ) +
        calculate_offset(numberOfVertices, radius)
      );
    }
  }

  function vertex_to_angle(vertex_index, numberOfVertices) {
    // console.log("function vertex to angle called");
    let angle = (vertex_index * 360) / numberOfVertices;
    // make sure angle value is 0-360
    if (angle < 0) {
      angle = angle + 360;
    }
    return angle;
  }

  let previous_vertex_index_1 = 0;
  let previous_vertex_index_2 = 0;
  let previous_vertex_index_3 = 0;

  // 1 = most recent, 3 equals least recent
  function pick_vertex(restriction_type, numberOfVertices) {
    restriction_type = Number(restriction_type);
    // console.log("function pick vertex called");
    //restriction type 0 = no restrictions
    //restriction type 1 = cant be the same as pervious point
    //restriction type 2 = cannot be adjacent || the same as previous point

    new_pick = 0;
    is_valid_pick = 0;
    while (is_valid_pick == 0) {
      new_pick = truncate(random(1, numberOfVertices));
      is_valid_pick = 1;

      if (restriction_type == 1) {
        if (new_pick == previous_vertex_index_1) {
          is_valid_pick = 0;
        }
      }
      if (restriction_type == 2) {
        neighbor_plus_1 = previous_vertex_index_1 % numberOfVertices;
        neighbor_plus_1 = neighbor_plus_1 + 1;

        temp_minus = previous_vertex_index_1 - 2 + numberOfVertices;
        neighbor_minus_1 = temp_minus % numberOfVertices;
        neighbor_minus_1 = neighbor_minus_1 + 1;

        if (
          new_pick == previous_vertex_index_1 ||
          new_pick == neighbor_plus_1 ||
          new_pick == neighbor_minus_1
        ) {
          is_valid_pick = 0;
        }
      }
    }
    previous_vertex_index_3 = previous_vertex_index_2;
    previous_vertex_index_2 = previous_vertex_index_1;
    previous_vertex_index_1 = new_pick;

    return new_pick;
  }

  function lerp(x1, y1, x2, y2, n) {
    // console.log("function lerp");
    lerp_x = x1 + (x2 - x1) * n;
    lerp_y = y1 + (y2 - y1) * n;
    let lerpResults = { x: lerp_x, y: lerp_y };
    return lerpResults;
  }

  // gets point distance to target vertex, takes that value, normalizes it, && adjusts the luminance based on the value
  // closer to target vertex = darker
  function adjust_luminance(point_x, point_y, vertex_x, vertex_y, radius) {
    // console.log("function adjust luminance called");
    dist = Math.sqrt((vertex_x - point_x) ** 2 + (vertex_y - point_y) ** 2);
    normalized_dist = dist / (2 * radius);
    return normalized_dist;
  }
  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;
  let savedInputs = null;
  let isFractalDrawing = false;
  let didErase = false;

  function startPosition(e) {
    // user-select: none
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    lastX = e.clientX - rect.left;
    lastY = e.clientY - rect.top;
    erase(e);

    if (savedInputs !== null && isFractalDrawing === false) {
      didErase = false;
      startDraw(savedInputs, false);
    }
  }

  function finishedPosition() {
    if (!isDrawing) return;
    isDrawing = false;
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
  }

  function erase(e) {
    if (!isDrawing) return;
    didErase = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    // ctx.globalCompositeOperation = 'destination-out'
    // ctx.lineWidth = 60
    // ctx.lineCap = 'round'
    // ctx.lineJoin = 'round'
    // ctx.beginPath()
    // ctx.moveTo(lastX, lastY)
    // ctx.lineTo(x, y)
    // ctx.stroke()
    lastX = x;
    lastY = y;
  }

  // 3. Event Listeners
  window.addEventListener("mousedown", startPosition);
  window.addEventListener("mouseup", finishedPosition);
  window.addEventListener("mousemove", erase);

  function startDraw(inputArray, shouldClear) {
    savedInputs = inputArray;
    isFractalDrawing = true;

    if (shouldClear) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // console.log("function start draw called");

      previous_vertex_index_1 = 0;
      previous_vertex_index_2 = 0;
      previous_vertex_index_3 = 0;
    }

    // start_x, start_y, restriction_type, n, num_of_points, color_bool, lighten_bool
    let current_x = centerX;
    let current_y = centerY;

    let current_r = 0;
    let current_g = 0;
    let current_b = 0;

    let pointsDrawn = 0;
    let isCalculatingPoints = false;
    function drawBatch() {
      isCalculatingPoints = true;
      ctx.globalCompositeOperation = "source-over";
      let pointsPerFrame =
        Math.max(1, Math.floor(Math.log(pointsDrawn + 1))) * 8;
      // let pointsPerFrame = Math.min(Math.floor(1/3000*(pointsDrawn**2)+300),((1/pointsDrawn)*50000)*10)
      // let pointsPerFrame = Math.max(1, Math.floor(Math.sqrt(10*pointsDrawn)));

      for (let i = 0; i < pointsPerFrame; i++) {
        if (pointsDrawn >= inputArray.numOfPoints) {
          isFractalDrawing = false;
          if (didErase) {
            didErase = false;
            startDraw(savedInputs, false);
          }
          return;
        }

        target_vertex = pick_vertex(
          inputArray.rType,
          inputArray.numberOfVertices,
        );

        // Get the coordinates of the chosen vertex
        target_x = get_vertex_coord(
          "x",
          target_vertex,
          inputArray.numberOfVertices,
          inputArray.radius,
        );
        target_y = get_vertex_coord(
          "y",
          target_vertex,
          inputArray.numberOfVertices,
          inputArray.radius,
        );

        if (inputArray.colorBool == true) {
          // Set color based on the chosen vertex
          angle = vertex_to_angle(target_vertex, inputArray.numberOfVertices);

          if (inputArray.lightenBool == true) {
            adjusted_luminance = adjust_luminance(
              current_x,
              current_y,
              target_x,
              target_y,
              inputArray.radius,
            );
            let rgbResult = hsl_to_rgb(angle / 360, 1, adjusted_luminance);
            current_r = rgbResult.r;
            current_g = rgbResult.g;
            current_b = rgbResult.b;
          } else {
            let rgbResult = hsl_to_rgb(angle / 360, 1, 0.5);
            current_r = rgbResult.r;
            current_g = rgbResult.g;
            current_b = rgbResult.b;
          }
          //    pc r, g, b
        } else {
          // color_bool = false
          current_r = 255;
          current_g = 255;
          current_b = 255;
        }
        // Move a fraction of the way from the current point to the target vertex
        let lerpResults = lerp(
          current_x,
          current_y,
          target_x,
          target_y,
          inputArray.nValue,
        );

        // The new position becomes the current position
        current_x = lerpResults.x;
        current_y = lerpResults.y;

        // Go to the new position && draw a small point
        // go current_x, current_y
        // console.log("start point draw")
        ctx.beginPath();
        ctx.arc(current_x, current_y, 13, 0, 2 * Math.PI);
        ctx.fillStyle = `rgb(${current_r}, ${current_g}, ${current_b})`;
        ctx.fill();
        // ctx.stroke();

        pointsDrawn++;
      }

      if (pointsDrawn < inputArray.numOfPoints) {
        requestAnimationFrame(drawBatch);
      }
    }

    drawBatch();
  }
  setTimeout(() => {
    let element = document.getElementById("hero-section");
    canvas.width = element.offsetWidth;
    canvas.height = element.offsetHeight;

    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    startDraw(
      {
        numberOfVertices: 50,
        rType: 3,
        nValue: 0.35,
        numOfPoints: 15000,
        radius: Math.min(canvas.width, canvas.height) * 1.5,
        colorBool: true,
        lightenBool: true,
        noClear: true,
      },
      true,
    );

    window.addEventListener("resize", () => {
      setTimeout(() => {
        targetWidth = getComputedStyle(
          document.getElementById("grainy-background"),
        ).width;
        targetHeight = getComputedStyle(
          document.getElementById("grainy-background"),
        ).height;
        canvas.height = targetHeight;
        canvas.width = targetWidth;
        centerX = canvas.width / 2;
        centerY = canvas.height / 2;
        startDraw(
          {
            numberOfVertices: 50,
            rType: 3,
            nValue: 0.35,
            numOfPoints: 15000,
            radius: Math.min(canvas.width, canvas.height) * 1.5,
            colorBool: true,
            lightenBool: true,
            noClear: true,
          },
          true,
        );
      }, 150);
    });
    // const canvas = document.getElementById("canvas");
    // const ctx = canvas.getContext("2d");
    // ctx.beginPath()
    // ctx.arc(500, 500, 0.5, 0, 2 * Math.PI)
    // ctx.stroke()
  }, 20);
});
