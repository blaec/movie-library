package com.blaec.movielibrary.utils;

import lombok.experimental.UtilityClass;

import java.util.ArrayDeque;
import java.util.Queue;

@UtilityClass
public class PermissionMonitor {
    private final static int MAX_SIZE = 20;
    private final Queue<Boolean> queue = new ArrayDeque<>(MAX_SIZE);

    /***
     * Store true for allowed request based on ip and false - for forbidden ip
     * @param isAllowed - true for allowed ip
     */
    public synchronized void enqueue(boolean isAllowed) {
        if (queue.size() >= MAX_SIZE) {
            queue.poll();
        }
        queue.offer(isAllowed);
    }

    /***
     * If queue contain any false value (for forbidden ip)
     * @return true when should alert of unauthorized access
     */
    public synchronized boolean isAlert() {
        return queue.stream().anyMatch(b -> !b);
    }
}
