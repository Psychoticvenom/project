/* 
 * source :  https://www.nayuki.io/res/smallest-enclosing-circle/smallest-enclosing-circle.js
 * Smallest enclosing circle - Library (JavaScript)
 * 
 * Copyright (c) 2017 Project Nayuki
 * https://www.nayuki.io/page/smallest-enclosing-circle
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program (see COPYING.txt and COPYING.LESSER.txt).
 * If not, see <http://www.gnu.org/licenses/>.
 */

"use strict";

/* 
 * Returns the smallest circle that encloses all the given points. Runs in expected O(n) time, randomized.
 * Input: A list of points, where each point is an object {x: float, y: float}, e.g. [{x:0,y:5}, {x:3.1,y:-2.7}].
 * Output: A circle object of the form {x: float, y: float, r: float}.
 * Note: If 0 points are given, null is returned. If 1 point is given, a circle of radius 0 is returned.
 */
// Initially: No boundary points known
function makeCircle(points) {
	// Progressively add points to circle or recompute circle
	var c = null;
	for (var i = 0; i < points.length; i++) {
		var p = points[i];
		if (c == null || !isInCircle(c, p))
			c = makeCircleOnePoint(points.slice(0, i + 1), p);
	}
	return c;
}


// One boundary point known
function makeCircleOnePoint(points, p) {
	var c = {x: p.x, y: p.y, r: 0};
	for (var i = 0; i < points.length; i++) {
		var q = points[i];
		if (!isInCircle(c, q)) {
			if (c.r == 0)
				c = makeDiameter(p, q);
			else
				c = makeCircleTwoPoints(points.slice(0, i + 1), p, q);
		}
	}
	return c;
}


// Two boundary points known
function makeCircleTwoPoints(points, p, q) {
	var circ = makeDiameter(p, q);
	var left = null;
	var right = null;
	
	// For each point not in the two-point circle
	points.forEach(function(r) {
		if (isInCircle(circ, r))
			return;
		
		// Form a circumcircle and classify it on left or right side
		var cross = crossProduct(p.x, p.y, q.x, q.y, r.x, r.y);
		var c = makeCircumcircle(p, q, r);
		if (c == null)
			return;
		else if (cross > 0 && (left == null || crossProduct(p.x, p.y, q.x, q.y, c.x, c.y) > crossProduct(p.x, p.y, q.x, q.y, left.x, left.y)))
			left = c;
		else if (cross < 0 && (right == null || crossProduct(p.x, p.y, q.x, q.y, c.x, c.y) < crossProduct(p.x, p.y, q.x, q.y, right.x, right.y)))
			right = c;
	});
	
	// Select which circle to return
	if (left == null && right == null)
		return circ;
	else if (left == null)
		return right;
	else if (right == null)
		return left;
	else
		return left.r <= right.r ? left : right;
}


function makeCircumcircle(p0, p1, p2) {
	// Mathematical algorithm from Wikipedia: Circumscribed circle
	var ax = p0.x, ay = p0.y;
	var bx = p1.x, by = p1.y;
	var cx = p2.x, cy = p2.y;
	var ox = (Math.min(ax, bx, cx) + Math.max(ax, bx, cx)) / 2;
	var oy = (Math.min(ay, by, cy) + Math.max(ay, by, cy)) / 2;
	ax -= ox; ay -= oy;
	bx -= ox; by -= oy;
	cx -= ox; cy -= oy;
	var d = (ax * (by - cy) + bx * (cy - ay) + cx * (ay - by)) * 2;
	if (d == 0)
		return null;
	var x = ox + ((ax * ax + ay * ay) * (by - cy) + (bx * bx + by * by) * (cy - ay) + (cx * cx + cy * cy) * (ay - by)) / d;
	var y = oy + ((ax * ax + ay * ay) * (cx - bx) + (bx * bx + by * by) * (ax - cx) + (cx * cx + cy * cy) * (bx - ax)) / d;
	var ra = distance(x, y, p0.x, p0.y);
	var rb = distance(x, y, p1.x, p1.y);
	var rc = distance(x, y, p2.x, p2.y);
	return {x: x, y: y, r: Math.max(ra, rb, rc)};
}


function makeDiameter(p0, p1) {
	var x = (p0.x + p1.x) / 2;
	var y = (p0.y + p1.y) / 2;
	var r0 = distance(x, y, p0.x, p0.y);
	var r1 = distance(x, y, p1.x, p1.y);
	return {x: x, y: y, r: Math.max(r0, r1)};
}


/* Simple mathematical functions */

function isInCircle(c, p) {
	var MULTIPLICATIVE_EPSILON = 1 + 1e-14;
	return c != null && distance(p.x, p.y, c.x, c.y) <= c.r * MULTIPLICATIVE_EPSILON;
}


// Returns twice the signed area of the triangle defined by (x0, y0), (x1, y1), (x2, y2).
function crossProduct(x0, y0, x1, y1, x2, y2) {
	return (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
}


function distance(x0, y0, x1, y1) {
	return Math.hypot(x0 - x1, y0 - y1);
}


if (!("hypot" in Math)) {  // Polyfill
	Math.hypot = function(x, y) {
		return Math.sqrt(x * x + y * y);
	};
}